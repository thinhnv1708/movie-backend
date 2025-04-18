import { Inject, Injectable } from '@nestjs/common';
import { DataSource, In, Like, Repository } from 'typeorm';
import { getSkip } from '../../lib/utils/getSkip';
import { GroupEntity } from '../../postgre/entities/GroupEntity';
import { GroupPolicyEntity } from '../../postgre/entities/GroupPolicyEntity';
import { PolicyEntity } from '../../postgre/entities/PolicyEntity';
import { IGroupRepository } from './IGroupRepository';

@Injectable()
export class GroupRepository implements IGroupRepository {
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
    @Inject(GroupEntity)
    private groupModel: Repository<GroupEntity>,
    @Inject(PolicyEntity)
    private policyModel: Repository<PolicyEntity>,
    @Inject(GroupPolicyEntity)
    private groupPolicyModel: Repository<GroupPolicyEntity>,
  ) {}

  async getGroup(id: string): Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: number;
    updatedAt: number;
  }> {
    return this.groupModel.findOne({ where: { id } });
  }

  async createGroup(data: {
    id: string;
    name: string;
    description: string;
    policyIds: string[];
    createdAt: number;
    updatedAt: number;
  }) {
    const {
      id,
      name,
      description,
      policyIds,
      createdAt,
      updatedAt,
    } = data;

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const groupModel =
        transactionalEntityManager.getRepository(GroupEntity);
      const groupPolicyModel =
        transactionalEntityManager.getRepository(GroupPolicyEntity);

      await groupModel.insert({
        id,
        name,
        description,
        createdAt,
        updatedAt,
      });

      if (policyIds.length > 0) {
        await groupPolicyModel.insert(
          policyIds.map((policyId) => ({
            groupId: id,
            policyId,
          })),
        );
      }
    });
  }

  async getPoliciesByIds(policyIds: string[]): Promise<{ id: string }[]> {
    return this.policyModel.find({
      where: { id: In(policyIds) },
      select: { id: true },
    });
  }

  async updateGroup(data: {
    id: string;
    name?: string;
    description?: string;
    policyIds?: string[];
    updatedAt: number;
  }) {
    const { id, name, description, policyIds, updatedAt } = data;

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const groupPolicyModel =
        transactionalEntityManager.getRepository(GroupPolicyEntity);
      const groupModel =
        transactionalEntityManager.getRepository(GroupEntity);

      await groupModel.update(
        { id },
        {
          ...(name && { name }),
          ...(description && { description }),
          updatedAt,
        },
      );

      if (policyIds?.length > 0) {
        await groupPolicyModel.delete({ groupId: id });
        await groupPolicyModel.insert(
          policyIds.map((policyId) => ({ groupId: id, policyId })),
        );
      }
    });
  }

  async deleteGroup(id: string) {
    await this.groupModel.delete({ id });
  }

  async listGroups(query: {
    page: number;
    limit: number;
    name?: string;
  }): Promise<{
    total: number;
    items: {
      id: string;
      name: string;
      description: string;
      createdAt: number;
      updatedAt: number;
    }[];
  }> {
    const { page, limit, name } = query;

    const [items, total] = await this.groupModel.findAndCount({
      where: {
        ...(name && { name: Like(`%${name}%`) }),
      },
      take: limit,
      skip: getSkip(page, limit),
    });

    return {
      total,
      items,
    };
  }

  async getDetailGroup(id: string): Promise<{
    id: string;
    name: string;
    description: string;
    policies: { id: string; name: string }[];
    createdAt: number;
    updatedAt: number;
  }> {
    const group = await this.groupModel.findOne({
      where: { id },
    });

    if (!group) {
      return null;
    }

    const { name, description, createdAt, updatedAt } = group;

    const groupPolicies = await this.groupPolicyModel.find({
      where: { groupId: id },
    });

    const policyIds = groupPolicies.map((gp) => gp.policyId);
    
    const policies = policyIds.length > 0 
      ? await this.policyModel.find({
          where: { id: In(policyIds) },
          select: ['id', 'name'],
        })
      : [];

    return {
      id,
      name,
      description,
      policies,
      createdAt,
      updatedAt,
    };
  }
}