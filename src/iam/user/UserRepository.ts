import { Inject, Injectable } from '@nestjs/common';
import { DataSource, In, Like, Repository } from 'typeorm';
import { getSkip } from '../../lib/utils/getSkip';
import { GroupEntity } from '../../postgre/entities/GroupEntity';
import { PolicyEntity } from '../../postgre/entities/PolicyEntity';
import { UserEntity } from '../../postgre/entities/UserEntity';
import { UserGroupEntity } from '../../postgre/entities/UserGroupEntity';
import { UserPolicyEntity } from '../../postgre/entities/UserPolicyEntity';
import { UserTokenEntity } from '../../postgre/entities/UserTokenEntity';
import { IUserRepository } from './IUserRepository';
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
    @Inject(UserEntity)
    private userModel: Repository<UserEntity>,
    @Inject(PolicyEntity)
    private policyModel: Repository<PolicyEntity>,
    @Inject(GroupEntity)
    private groupModel: Repository<GroupEntity>,
  ) {}

  async getUserById(id: string): Promise<{
    id: string;
    isRoot: boolean;
    activated: boolean;
    email: string;
    password: string;
    lastAccess: number;
    createdAt: number;
    updatedAt: number;
  }> {
    return this.userModel.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<{
    id: string;
    isRoot: boolean;
    activated: boolean;
    email: string;
    password: string;
    lastAccess: number;
    createdAt: number;
    updatedAt: number;
  }> {
    return this.userModel.findOne({ where: { email } });
  }

  async getPoliciesByIds(policyIds: string[]): Promise<{ id: string }[]> {
    return this.policyModel.find({
      where: { id: In(policyIds) },
      select: { id: true },
    });
  }

  getGroupsByIds(groupIds: string[]): Promise<{ id: string }[]> {
    return this.groupModel.find({
      where: { id: In(groupIds) },
      select: { id: true },
    });
  }

  async createUser(data: {
    id: string;
    isRoot: boolean;
    activated: boolean;
    email: string;
    password: string;
    policyIds: string[];
    groupIds: string[];
    createdAt: number;
    updatedAt: number;
  }) {
    const {
      id,
      isRoot,
      activated,
      email,
      password,
      policyIds,
      groupIds,
      createdAt,
      updatedAt,
    } = data;

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const userModel = transactionalEntityManager.getRepository(UserEntity);
      const userPolicyModel =
        transactionalEntityManager.getRepository(UserPolicyEntity);
      const userGroupModel =
        transactionalEntityManager.getRepository(UserGroupEntity);

      await userModel.insert({
        id,
        isRoot,
        activated,
        email,
        password,
        createdAt,
        updatedAt,
      });

      if (policyIds.length > 0) {
        await userPolicyModel.insert(
          policyIds.map((policyId) => ({ userId: id, policyId })),
        );
      }

      if (groupIds.length > 0) {
        await userGroupModel.insert(
          groupIds.map((groupId) => ({ userId: id, groupId })),
        );
      }
    });
  }

  async updateUser(
    userId: string,
    data: Partial<{ policyIds: string[]; groupIds: string[] }>,
  ) {
    const { policyIds, groupIds } = data;

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const userPolicyModel =
        transactionalEntityManager.getRepository(UserPolicyEntity);
      const userGroupModel =
        transactionalEntityManager.getRepository(UserGroupEntity);

      if (policyIds) {
        await userPolicyModel.delete({ userId });

        if (policyIds.length > 0) {
          await userPolicyModel.insert(
            policyIds.map((policyId) => ({ userId, policyId })),
          );
        }
      }

      if (groupIds) {
        await userGroupModel.delete({ userId });

        if (groupIds.length > 0) {
          await userGroupModel.insert(
            groupIds.map((groupId) => ({ userId, groupId })),
          );
        }
      }
    });
  }

  async saveUserToken(data: {
    id: string;
    userId: string;
    token: string;
    createdAt: number;
    expiresAt: number;
  }): Promise<void> {
    const { id, userId, token, createdAt, expiresAt } = data;

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const userTokenModel =
        transactionalEntityManager.getRepository(UserTokenEntity);

      await userTokenModel.delete({ userId });

      await userTokenModel.insert({
        id,
        userId,
        token,
        createdAt,
        expiresAt,
      });
    });
  }

  async updateActivatedUser(userId: string, password: string) {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const userModel = transactionalEntityManager.getRepository(UserEntity);
      const userTokenModel =
        transactionalEntityManager.getRepository(UserTokenEntity);

      await userModel.update(userId, {
        activated: true,
        password,
      });

      await userTokenModel.delete({ userId });
    });
  }

  async updateUserPassword(userId: string, newPassword: string) {
    await this.userModel.update(userId, {
      password: newPassword,
      updatedAt: Math.floor(Date.now() / 1000), // Current timestamp in seconds
    });
  }

  async deleteUser(userId: string) {
    await this.userModel.delete(userId);
  }

  async getGroupsOfUser(
    userId: string,
  ): Promise<{ id: string; name: string }[]> {
    // const userroups = await
    return;
  }

  getPoliciesOfGroups(
    groupIds: string[],
  ): Promise<{ id: string; name: string }[]> {
    return;
  }

  getPoliciesOfUser(userId: string): Promise<{ id: string; name: string }[]> {
    return;
  }

  async getUsers(params: {
    page: number;
    limit: number;
    email?: string;
    activated?: boolean;
  }): Promise<{
    users: {
      id: string;
      isRoot: boolean;
      activated: boolean;
      email: string;
      lastAccess: number;
      createdAt: number;
      updatedAt: number;
    }[];
    total: number;
  }> {
    const { page, limit, email, activated } = params;
    const skip = getSkip(page, limit);

    // Build where conditions
    const where: any = {};

    if (email) {
      where.email = Like(`%${email}%`);
    }

    if (activated !== undefined) {
      where.activated = activated;
    }

    // Query with pagination
    const [users, total] = await this.userModel.findAndCount({
      where,
      select: {
        id: true,
        isRoot: true,
        activated: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { users, total };
  }
}
