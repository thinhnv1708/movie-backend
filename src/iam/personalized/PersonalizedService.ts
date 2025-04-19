import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IIamConfig } from '../../config/interfaces/IIamConfig';
import BusinessError from '../../lib/BusinessError';
import StatusCode from '../../lib/StatusCode';
import { PasswordHandler } from '../../lib/helpers/PasswordHandler';
import { IPersonalizedRepository } from './IPersonalizedRepository';
import getTimestampSeconds from '../../lib/utils/getTimestampSeconds';
import { IIatRepository } from '../iat/IIatRepository';

@Injectable()
export class PersonalizedService {
  constructor(
    @Inject('PersonalizedRepo')
    private readonly personalizedRepo: IPersonalizedRepository,
    @Inject('IatRepo')
    private readonly iatRepo: IIatRepository,
    private readonly configService: ConfigService,
    private readonly passwordHandler: PasswordHandler,
  ) {}

  async changePassword(data: {
    userId: string;
    currentPassword: string;
    newPassword: string;
  }) {
    const { userId, currentPassword, newPassword } = data;

    const user = await this.personalizedRepo.getUserById(userId);

    if (!user) {
      throw new BusinessError(StatusCode.USER_NOT_FOUND);
    }

    const iamConfig = this.configService.get<IIamConfig>('iam');

    // Verify current password
    const currentPasswordIsValid = this.passwordHandler.verify(
      currentPassword,
      user.password,
      iamConfig.passwordSecret,
    );

    if (!currentPasswordIsValid) {
      throw new BusinessError(StatusCode.INVALID_PASSWORD);
    }

    // Hash new password
    const hashedPassword = this.passwordHandler.hash(
      newPassword,
      iamConfig.passwordSecret,
    );

    const updatedAt = getTimestampSeconds();

    // Update password in database
    await this.personalizedRepo.updateUserPassword(
      userId,
      hashedPassword,
      updatedAt,
    );

    // Update IAT to revoke old tokens
    const newIat = getTimestampSeconds();

    // Use the refresh token expiration time instead of access token expiration
    // This ensures that both access tokens and refresh tokens are revoked
    await this.iatRepo.setIat(
      userId,
      newIat,
      iamConfig.jwtRefreshTokenExpiresIn,
    );

    return {
      message: 'Password changed successfully',
    };
  }

  async getMyInfo(userId: string) {
    if (!userId) {
      throw new BusinessError(StatusCode.USER_NOT_FOUND);
    }

    const userInfo = await this.personalizedRepo.getUserInfo(userId);
    
    if (!userInfo) {
      throw new BusinessError(StatusCode.USER_NOT_FOUND);
    }

    return userInfo;
  }
}
