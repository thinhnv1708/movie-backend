import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { IIamConfig } from '../../config/interfaces/IIamConfig';
import BusinessError from '../../lib/BusinessError';
import idGenerator from '../../lib/idGenerator';
import StatusCode from '../../lib/StatusCode';
import getTimestampSeconds from '../../lib/utils/getTimestampSeconds';
import { SendMessageService } from '../../send-message/SendMessageService';
import { IUserRepository } from './IUserRepository';
import { PasswordHandler } from '../../lib/helpers/PasswordHandler';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepo') private readonly userRepo: IUserRepository,
    private readonly sendMessageService: SendMessageService,
    private readonly configService: ConfigService,
    private readonly passwordHandler: PasswordHandler,
  ) {}

  async createUser(createUserData: {
    email: string;
    policyIds: string[];
    groupIds: string[];
  }): Promise<{
    id: string;
    isRoot: boolean;
    activated: boolean;
    email: string;
    password: string;
    createdAt: number;
    updatedAt: number;
  }> {
    let { policyIds, groupIds } = createUserData;
    const email = createUserData.email;

    const user = await this.userRepo.getUserByEmail(email);

    if (user) {
      throw new BusinessError(StatusCode.EMAIL_ALREADY_EXISTS);
    }

    if (policyIds.length > 0) {
      // make unique policyIds
      policyIds = [...new Set(policyIds)];

      const policies = await this.userRepo.getPoliciesByIds(policyIds);

      if (policies.length !== policyIds.length) {
        throw new BusinessError(StatusCode.SOME_POLICY_NOT_FOUND);
      }
    }

    if (groupIds.length > 0) {
      // make unique groupIds
      groupIds = [...new Set(groupIds)];

      const groups = await this.userRepo.getGroupsByIds(groupIds);

      if (groups.length !== groupIds.length) {
        throw new BusinessError(StatusCode.SOME_POLICY_NOT_FOUND);
      }
    }

    const now = getTimestampSeconds();

    const newUser = {
      id: idGenerator(),
      isRoot: false,
      activated: false,
      email,
      password: '',
      policyIds,
      groupIds,
      createdAt: now,
      updatedAt: now,
    };

    await this.userRepo.createUser(newUser);

    return newUser;
  }

  private hashToken(token: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(token);
    return hash.digest('hex');
  }

  private async makeUserToken(data: {
    userId: string;
    expiresIn: number; // seconds
  }): Promise<string> {
    const { userId, expiresIn } = data;
    const token = crypto.randomBytes(32).toString('hex');
    const now = getTimestampSeconds();
    const expiresAt = now + expiresIn;

    const hashedToken = this.hashToken(token);

    const userToken = {
      id: idGenerator(),
      userId,
      token: hashedToken,
      createdAt: now,
      updatedAt: now,
      expiresAt,
    };

    await this.userRepo.saveUserToken(userToken);

    return token;
  }

  async sendMessageActivateUser(userId: string) {
    const user = await this.userRepo.getUserById(userId);

    if (!user) {
      throw new BusinessError(StatusCode.DATA_NOT_FOUND);
    }

    if (user.activated) {
      throw new BusinessError(StatusCode.USER_ALREADY_ACTIVATED);
    }

    const iamConfig = this.configService.get<IIamConfig>('iam');

    const token = await this.makeUserToken({
      userId: user.id,
      expiresIn: iamConfig.activateUserTokenExpiresIn,
    });

    const activateUrl = iamConfig.activateUserUrl.replace('{token}', token);

    const sendMessageResponse = await this.sendMessageService.send({
      to: user.email,
      subject: 'Activate your account',
      content: `Click here to activate your account: ${activateUrl}`,
    });

    return sendMessageResponse;
  }

  async activateUser(data: { token: string; password: string }) {
    const { token, password } = data;
    const hashedToken = this.hashToken(token);

    const userToken = await this.userRepo.getUserTokenByToken(hashedToken);

    if (!userToken) {
      throw new BusinessError(StatusCode.USER_TOKEN_NOT_FOUND);
    }

    const now = getTimestampSeconds();

    if (now > userToken.expiresAt) {
      throw new BusinessError(StatusCode.USER_TOKEN_EXPIRED);
    }

    const user = await this.userRepo.getUserById(userToken.userId);

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

    await this.userRepo.updateActivatedUser(user.id, hashedPassword);

    return {
      message: 'User activated successfully',
    };
  }

  async updateUser(
    userId: string,
    updateUserData: {
      policyIds?: string[];
      groupIds?: string[];
    },
  ) {
    let { policyIds, groupIds } = updateUserData;
    const user = await this.userRepo.getUserById(userId);

    if (!user) {
      throw new BusinessError(StatusCode.DATA_NOT_FOUND);
    }

    if (user.isRoot) {
      throw new BusinessError(StatusCode.FORBIDDEN);
    }

    // check permission exists
    if (policyIds?.length > 0) {
      // make unique policyIds
      policyIds = [...new Set(policyIds)];

      const policies = await this.userRepo.getPoliciesByIds(policyIds);

      if (policies.length !== policyIds.length) {
        throw new BusinessError(StatusCode.SOME_POLICY_NOT_FOUND);
      }
    }

    if (groupIds?.length > 0) {
      // make unique groupIds
      groupIds = [...new Set(groupIds)];

      const groups = await this.userRepo.getGroupsByIds(groupIds);

      if (groups.length !== groupIds.length) {
        throw new BusinessError(StatusCode.SOME_POLICY_NOT_FOUND);
      }
    }

    const dataUpdate = {
      policyIds,
      groupIds,
      updatedAt: getTimestampSeconds(),
    };

    await this.userRepo.updateUser(user.id, dataUpdate);
  }

  async getUserDetails(userId: string) {
    const user = await this.userRepo.getUserById(userId);

    if (!user) {
      throw new BusinessError(StatusCode.DATA_NOT_FOUND);
    }

    const [groups, policies] = await Promise.all([
      this.userRepo.getGroupsOfUser(user.id),
      this.userRepo.getPoliciesOfUser(user.id),
    ]);

    let allPolicies = policies;

    if (groups.length > 0) {
      const policiesOfGroup = await this.userRepo.getPoliciesOfGroups(
        groups.map((group) => group.id),
      );

      allPolicies = allPolicies.concat(policiesOfGroup);
    }

    delete user.password;

    return {
      ...user,
      groups,
      policies: allPolicies,
    };
  }

  async deleteUser(userId: string) {
    const user = await this.userRepo.getUserById(userId);

    if (!user) {
      throw new BusinessError(StatusCode.DATA_NOT_FOUND);
    }

    if (user.isRoot) {
      throw new BusinessError(StatusCode.FORBIDDEN);
    }

    await this.userRepo.deleteUser(user.id);

    return {
      message: 'User deleted successfully',
    };
  }

  async getUsers(params: {
    page: number;
    limit: number;
    email?: string;
    activated?: boolean;
  }) {
    const { page, limit, email, activated } = params;

    const result = await this.userRepo.getUsers({
      page,
      limit,
      email,
      activated,
    });

    return {
      items: result.users,
      total: result.total,
      page,
      limit,
    };
  }
}
