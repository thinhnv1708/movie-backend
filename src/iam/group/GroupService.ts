import { Inject, Injectable } from '@nestjs/common';
import BusinessError from '../../lib/BusinessError';
import idGenerator from '../../lib/idGenerator';
import StatusCode from '../../lib/StatusCode';
import getTimestampSeconds from '../../lib/utils/getTimestampSeconds';
import { IGroupRepository } from './IGroupRepository';

@Injectable()
export class GroupService {
  constructor(
    @Inject('GroupRepo') private readonly groupRepo: IGroupRepository,
  ) {}

  async createGroup(data: {
    name: string;
    description?: string;
    policyIds: string[];
  }) {
    const { name, description } = data;

    let policyIds = data.policyIds;

    // make unique policyIds
    policyIds = [...new Set(policyIds)];

    // check policyIds valid
    const policies = await this.groupRepo.getPoliciesByIds(policyIds);

    if (policies.length !== policyIds.length) {
      throw new BusinessError(StatusCode.SOME_POLICY_NOT_FOUND);
    }

    const now = getTimestampSeconds();

    const groupData = {
      id: idGenerator(),
      name,
      description,
      policyIds,
      createdAt: now,
      updatedAt: now,
    };

    await this.groupRepo.createGroup(groupData);

    return {
      id: groupData.id,
    };
  }

  async updateGroup(
    groupId: string,
    data: {
      name?: string;
      description?: string;
      policyIds?: string[];
    },
  ) {
    const { name, description, policyIds } = data;

    const group = await this.groupRepo.getGroup(groupId);

    if (!group) {
      throw new BusinessError(StatusCode.DATA_NOT_FOUND);
    }

    const groupData: {
      id: string;
      name?: string;
      description?: string;
      policyIds?: string[];
      updatedAt?: number;
    } = {
      id: groupId,
      name,
      description,
      updatedAt: getTimestampSeconds(),
    };

    // check policyIds valid
    if (policyIds?.length > 0) {
      const policies = await this.groupRepo.getPoliciesByIds(policyIds);

      if (policies.length !== policyIds.length) {
        throw new BusinessError(StatusCode.SOME_POLICY_NOT_FOUND);
      }

      groupData.policyIds = policyIds;
    }

    await this.groupRepo.updateGroup(groupData);

    return {
      id: groupData.id,
    };
  }

  async deleteGroup(id: string) {
    // check groupId valid
    const group = await this.groupRepo.getGroup(id);

    if (!group) {
      throw new BusinessError(StatusCode.DATA_NOT_FOUND);
    }

    await this.groupRepo.deleteGroup(id);

    return {
      id,
    };
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
    return this.groupRepo.listGroups(query);
  }

  async getDetailGroup(id: string) {
    const group = await this.groupRepo.getDetailGroup(id);

    if (!group) {
      throw new BusinessError(StatusCode.DATA_NOT_FOUND);
    }

    return group;
  }
}
