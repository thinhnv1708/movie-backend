import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { ActionEntity } from '../../postgre/entities/ActionEntity';
import { GroupPolicyEntity } from '../../postgre/entities/GroupPolicyEntity';
import { PolicyActionEntity } from '../../postgre/entities/PolicyActionEntity';
import { UserEntity } from '../../postgre/entities/UserEntity';
import { UserGroupEntity } from '../../postgre/entities/UserGroupEntity';
import { UserPolicyEntity } from '../../postgre/entities/UserPolicyEntity';
import { IAuthRepository } from './IAuthRepository';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @Inject(UserEntity)
    private userModel: Repository<UserEntity>,
    @Inject(UserPolicyEntity)
    private userPolicyModel: Repository<UserPolicyEntity>,
    @Inject(UserGroupEntity)
    private userGroupModel: Repository<UserGroupEntity>,
    @Inject(GroupPolicyEntity)
    private groupPolicyModel: Repository<GroupPolicyEntity>,
    @Inject(PolicyActionEntity)
    private policyActionModel: Repository<PolicyActionEntity>,
  ) {}

  getUserByEmail(email: string): Promise<{
    id: string;
    activated: boolean;
    isRoot: boolean;
    email: string;
    password: string;
  }> {
    return this.userModel.findOne({
      where: { email },
      select: {
        id: true,
        activated: true,
        isRoot: true,
        email: true,
        password: true,
      },
    });
  }

  async getUserById(userId: string): Promise<{ id: string }> {
    const user = await this.userModel.findOne({
      where: { id: userId },
      select: {
        id: true,
      },
    });

    return user;
  }

  async getUserActions(userId: string): Promise<
    {
      id: string;
      path: string;
      method: string;
    }[]
  > {
    const [userPolicies, userGroups] = await Promise.all([
      this.userPolicyModel.find({
        where: { userId },
      }),
      this.userGroupModel.find({
        where: { userId },
      }),
    ]);

    let policyIds = userPolicies.map((p) => p.policyId);

    if (userGroups.length > 0) {
      const groupIds = userGroups.map((g) => g.groupId);
      const groupPolicies = await this.groupPolicyModel.find({
        where: { groupId: In(groupIds) },
      });

      policyIds = policyIds.concat(groupPolicies.map((p) => p.policyId));
    }

    policyIds = [...new Set(policyIds)];
    policyIds = policyIds.map((p) => `'${p}'`);

    if (policyIds.length === 0) {
      return [];
    }

    const actions = await this.policyActionModel
      .createQueryBuilder('policyAction')
      .leftJoin(ActionEntity, 'action', `action.id = policyAction.actionId`)
      .where(`policyAction.policyId IN (${policyIds.join(',')})`)
      .select([
        'action.id as id',
        'action.method as method',
        'action.path as path',
      ])
      .execute();

    return actions;
  }

  async updateLastAccess(userId: string, lastAccess: number): Promise<void> {
    await this.userModel.update(userId, {
      lastAccess,
    });
  }
}
