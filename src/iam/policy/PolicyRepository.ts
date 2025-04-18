import { Inject, Injectable } from '@nestjs/common';
import { DataSource, In, Like, Repository } from 'typeorm';
import { getSkip } from '../../lib/utils/getSkip';
import { ActionEntity } from '../../postgre/entities/ActionEntity';
import { PolicyActionEntity } from '../../postgre/entities/PolicyActionEntity';
import { PolicyEntity } from '../../postgre/entities/PolicyEntity';
import { IPolicyRepository } from './IPolicyRepository';

@Injectable()
export class PolicyRepository implements IPolicyRepository {
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
    @Inject(PolicyEntity)
    private policyModel: Repository<PolicyEntity>,
    @Inject(ActionEntity)
    private actionModel: Repository<ActionEntity>,
  ) {}

  async getPolicy(id: string): Promise<{
    id: string;
    name: string;
    description: string;
    isDefault: boolean;
    createdAt: number;
    updatedAt: number;
  }> {
    return this.policyModel.findOne({ where: { id } });
  }

  async createPolicy(data: {
    id: string;
    name: string;
    description: string;
    isDefault: boolean;
    actionIds: string[];
    createdAt: number;
    updatedAt: number;
  }) {
    const {
      id,
      name,
      description,
      isDefault,
      actionIds,
      createdAt,
      updatedAt,
    } = data;

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const policyModel =
        transactionalEntityManager.getRepository(PolicyEntity);
      const policyActionModel =
        transactionalEntityManager.getRepository(PolicyActionEntity);

      await policyModel.insert({
        id,
        name,
        description,
        isDefault,
        createdAt,
        updatedAt,
      });

      await policyActionModel.insert(
        actionIds.map((actionId) => ({
          policyId: id,
          actionId,
        })),
      );
    });
  }

  async getActionsByIds(actionIds: string[]): Promise<{ id: string }[]> {
    return this.actionModel.find({
      where: { id: In(actionIds) },
      select: { id: true },
    });
  }

  async updatePolicy(data: {
    id: string;
    name?: string;
    description?: string;
    actionIds?: string[];
    updatedAt: number;
  }) {
    const { id, name, description, actionIds, updatedAt } = data;

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const policyActionModel =
        transactionalEntityManager.getRepository(PolicyActionEntity);
      const policyModel =
        transactionalEntityManager.getRepository(PolicyEntity);

      await policyModel.update(
        { id },
        {
          ...(name && { name }),
          ...(description && { description }),
          updatedAt,
        },
      );

      if (actionIds?.length > 0) {
        await policyActionModel.delete({ policyId: id });
        await policyActionModel.insert(
          actionIds.map((actionId) => ({ policyId: id, actionId })),
        );
      }
    });
  }

  async deletePolicy(id: string) {
    await this.policyModel.delete({ id });
  }

  // ///// query

  async listPolicies(query: {
    page: number;
    limit: number;
    name?: string;
    isDefault?: boolean;
  }): Promise<{
    total: number;
    items: {
      id: string;
      name: string;
      description: string;
      isDefault: boolean;
      createdAt: number;
      updatedAt: number;
    }[];
  }> {
    const { page, limit, name, isDefault } = query;

    const [items, total] = await this.policyModel.findAndCount({
      where: {
        ...(name && { name: Like(`%${name}%`) }),
        ...(isDefault !== undefined && { isDefault }),
      },
      take: limit,
      skip: getSkip(page, limit),
    });

    return {
      total,
      items,
    };
  }

  async getDetailPolicy(id: string): Promise<{
    id: string;
    name: string;
    description: string;
    isDefault: boolean;
    actions: { id: string; name: string }[];
    createdAt: number;
    updatedAt: number;
  }> {
    const result = await this.policyModel.findOne({
      where: { id },
      relations: {
        actions: true,
      },
    });

    if (!result) {
      return null;
    }

    const { name, description, isDefault, actions, createdAt, updatedAt } =
      result;

    return {
      id,
      name,
      description,
      isDefault,
      actions: actions.map((action) => ({ id: action.id, name: action.name })),
      createdAt,
      updatedAt,
    };
  }
}
