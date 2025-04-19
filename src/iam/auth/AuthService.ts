import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import { promisify } from 'util';
import IAppConfig from '../../config/interfaces/IAppConfig';
import { IIamConfig } from '../../config/interfaces/IIamConfig';
import BusinessError from '../../lib/BusinessError';
import { generateUserToken } from '../../lib/helpers/generateUserToken';
import { PasswordHandler } from '../../lib/helpers/PasswordHandler';
import { UserTokenHelper } from '../../lib/helpers/UserTokenHelper';
import idGenerator from '../../lib/idGenerator';
import IUserData from '../../lib/interfaces/IUserData';
import StatusCode from '../../lib/StatusCode';
import { executePromise } from '../../lib/utils/executePromise';
import getTimestampSeconds from '../../lib/utils/getTimestampSeconds';
import { SendMessageService } from '../../send-message/SendMessageService';
import { IIatRepository } from '../iat/IIatRepository';
import { getRessetPasswordMessage } from './helpers/getResetPasswordMessage';
import { IAuthRepository } from './IAuthRepository';

const readFileAsync = promisify(fs.readFile);

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepo') private readonly authRepo: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly passwordHandler: PasswordHandler,
    @Inject('IatRepo') private readonly iatRepo: IIatRepository,
    private readonly sendMessageService: SendMessageService,
    private readonly userTokenHelper: UserTokenHelper,
  ) {}

  async activateUser(data: { token: string; password: string }) {
    const { token, password } = data;
    const hashedToken = this.userTokenHelper.hashToken(token);

    const userToken = await this.authRepo.getUserTokenByToken(hashedToken);

    if (!userToken) {
      throw new BusinessError(StatusCode.USER_TOKEN_NOT_FOUND);
    }

    const now = getTimestampSeconds();

    if (now > userToken.expiresAt) {
      throw new BusinessError(StatusCode.USER_TOKEN_EXPIRED);
    }

    const user = await this.authRepo.getUserById(userToken.userId);

    if (!user) {
      throw new BusinessError(StatusCode.USER_NOT_FOUND);
    }

    if (user.activated) {
      throw new BusinessError(StatusCode.USER_ALREADY_ACTIVATED);
    }

    const iamConfig = this.configService.get<IIamConfig>('iam');

    const hashedPassword = this.passwordHandler.hash(
      password,
      iamConfig.passwordSecret,
    );

    await this.authRepo.updateActivatedUser(user.id, hashedPassword);

    return {
      message: 'User activated successfully',
    };
  }

  async login(email: string, password: string) {
    // Get user by email
    const user = await this.authRepo.getUserByEmail(email);
    if (!user) {
      throw new BusinessError(StatusCode.INVALID_CREDENTIALS);
    }

    // Check if user is activated
    if (!user.activated) {
      throw new BusinessError(StatusCode.USER_NOT_ACTIVATED);
    }

    // Verify password
    const iamConfig = this.configService.get<IIamConfig>('iam');
    const isPasswordValid = this.passwordHandler.verify(
      password,
      user.password,
      iamConfig.passwordSecret,
    );

    if (!isPasswordValid) {
      throw new BusinessError(StatusCode.INVALID_CREDENTIALS);
    }

    // Generate tokens
    const tokens = await this.generateTokens({
      userId: user.id,
      isRoot: user.isRoot,
    });

    // Update last login time
    const lastAccessTimestamp = getTimestampSeconds();
    await this.authRepo.updateLastAccess(user.id, lastAccessTimestamp);

    return tokens;
  }

  async refreshToken(refreshToken: string) {
    // Verify the refresh token
    const iamConfig = this.configService.get<IIamConfig>('iam');

    const [error, decoded] = await executePromise(
      this.jwtService.verifyAsync<{
        jti: string;
        userId: string;
        isRoot: boolean;
        iat: number;
        exp: number;
      }>(refreshToken, {
        secret: iamConfig.jwtRefreshTokenSecret,
      }),
    );

    if (error) {
      throw new BusinessError(StatusCode.INVALID_REFRESH_TOKEN);
    }

    const iat = await this.iatRepo.getIat(decoded.userId);

    if (iat >= decoded.iat) {
      throw new BusinessError(StatusCode.INVALID_REFRESH_TOKEN);
    }

    // Generate new tokens
    const tokens = await this.generateTokens({
      userId: decoded.userId,
      isRoot: decoded.isRoot,
    });

    // Update last login time
    const lastAccessTimestamp = getTimestampSeconds();
    await this.authRepo.updateLastAccess(decoded.userId, lastAccessTimestamp);

    return tokens;
  }

  private async generateTokens(payload: { userId: string; isRoot?: boolean }) {
    const iamConfig = this.configService.get<IIamConfig>('iam');

    // Generate access token
    const accessTokenPayload = {
      jti: idGenerator(),
      ...payload,
    };

    const accessToken = this.jwtService.sign(accessTokenPayload, {
      secret: iamConfig.jwtAccessTokenSecret,
      expiresIn: iamConfig.jwtAccessTokenExpiresIn,
    });

    // Generate refresh token
    const refreshTokenPayload = {
      jti: idGenerator(),
      ...payload,
    };

    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      secret: iamConfig.jwtRefreshTokenSecret,
      expiresIn: iamConfig.jwtRefreshTokenExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(token: string) {
    const iamConfig = this.configService.get<IIamConfig>('iam');

    const [error, decoded] = await executePromise(
      this.jwtService.verifyAsync<IUserData>(token, {
        secret: iamConfig.jwtAccessTokenSecret,
      }),
    );

    if (error) {
      throw new BusinessError(StatusCode.UNAUTHROIZED);
    }

    const iat = await this.iatRepo.getIat(decoded.userId);

    if (iat >= decoded.iat) {
      throw new BusinessError(StatusCode.UNAUTHROIZED);
    }

    return decoded;
  }

  async checkPermission(
    userInfo: {
      userId: string;
      isRoot: boolean;
    },
    reqMethod: string,
    reqPath: string,
  ) {
    if (userInfo.isRoot) {
      return true;
    }
    console.log('userInfo', userInfo);

    const actions = await this.authRepo.getUserActions(userInfo.userId);
    reqMethod = reqMethod.toUpperCase();
    reqPath = reqPath.toLowerCase();

    for (const action of actions) {
      if (reqMethod !== action.method && action.method !== '*') {
        continue;
      }

      const actionPathRegex = this.getPathRegex(action.path);

      if (!actionPathRegex.test(reqPath)) {
        continue;
      }

      return true;
    }

    return false;
  }

  private getPathRegex(path: string): RegExp {
    const pathComponents = path.split('/');

    for (let i = 0; i < pathComponents.length; i++) {
      const pathComponent = pathComponents[i];

      if (pathComponent === '*') {
        pathComponents[i] = '.*';
      }

      if (pathComponent === ':id') {
        pathComponents[i] = '[a-zA-Z0-9-_=]+';
      }
    }

    return new RegExp(`^${pathComponents.join('\/')}$`);
  }

  async sendMessageResetPassword(email: string) {
    const user = await this.authRepo.getUserByEmail(email);

    if (!user) {
      throw new BusinessError(StatusCode.EMAIL_NOT_FOUND);
    }

    if (!user.activated) {
      throw new BusinessError(StatusCode.USER_NOT_ACTIVATED);
    }

    const iamConfig = this.configService.get<IIamConfig>('iam');
    const appConfig = this.configService.get<IAppConfig>('app');

    const userToken = await generateUserToken(this.userTokenHelper, {
      userId: user.id,
      expiresIn: iamConfig.resetPasswordTokenExpiresIn,
    });

    const resetUrl = `${iamConfig.resetPasswordUrl}?token=${userToken.token}`;

    const messageContent = await getRessetPasswordMessage({
      resetUrl,
      resetTokenExpiresIn: iamConfig.resetPasswordTokenExpiresIn,
      logoUrl: appConfig.logoUrl,
    });

    await this.authRepo.saveUserToken(userToken);

    // Send password reset email
    await this.sendMessageService.sendMessage({
      to: email,
      subject: 'Password Reset Request',
      content: messageContent,
    });

    return {
      message:
        'If your email exists in our system, you will receive a password reset link',
    };
  }

  async resetPassword(data: { token: string; newPassword: string }) {
    const { token, newPassword } = data;

    await this.activateUser({ token, password: newPassword });

    return { message: 'Password has been reset successfully' };
  }
}
