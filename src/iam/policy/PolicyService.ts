import { Inject, Injectable } from '@nestjs/common';
import BusinessError from '../../lib/BusinessError';
import idGenerator from '../../lib/idGenerator';
import StatusCode from '../../lib/StatusCode';
import getTimestampSeconds from '../../lib/utils/getTimestampSeconds';
import { IPolicyRepository } from './IPolicyRepository';

@Injectable()
export class PolicyService {
  constructor(
    @Inject('PolicyRepo') private readonly policyRepo: IPolicyRepository,
  ) {}

  async createPolicy(data: {
    name: string;
    description?: string;
    actionIds: string[];
  }) {
    const { name, description } = data;

    let actionIds = data.actionIds;

    // make unique actionIds
    actionIds = [...new Set(actionIds)];

    // check actionIds valid
    const actions = await this.policyRepo.getActionsByIds(actionIds);

    if (actions.length !== actionIds.length) {
      throw new BusinessError(StatusCode.SOME_ACTION_NOT_FOUND);
    }

    const now = getTimestampSeconds();

    const policyData = {
      id: idGenerator(),
      name,
      description,
      isDefault: false,
      actionIds,
      createdAt: now,
      updatedAt: now,
    };

    await this.policyRepo.createPolicy(policyData);

    return {
      id: policyData.id,
    };
  }

  async updatePolicy(
    policyId: string,
    data: {
      name?: string;
      description?: string;
      actionIds?: string[];
    },
  ) {
    const { name, description, actionIds } = data;

    const policy = await this.policyRepo.getPolicy(policyId);

    if (!policy) {
      throw new BusinessError(StatusCode.DATA_NOT_FOUND);
    }

    if (policy.isDefault) {
      throw new BusinessError(StatusCode.CANNOT_MODIFY_DEFAULT_POLICY);
    }

    const policyData: {
      id: string;
      name?: string;
      description?: string;
      actionIds?: string[];
      updatedAt?: number;
    } = {
      id: policyId,
      name,
      description,
      updatedAt: getTimestampSeconds(),
    };

    // check actionIds valid
    if (actionIds?.length > 0) {
      const actions = await this.policyRepo.getActionsByIds(actionIds);

      if (actions.length !== actionIds.length) {
        throw new BusinessError(StatusCode.SOME_ACTION_NOT_FOUND);
      }

      policyData.actionIds = actionIds;
    }

    await this.policyRepo.updatePolicy(policyData);

    return {
      id: policyData.id,
    };
  }

  async deletePolicy(id: string) {
    // check policyId valid
    const policy = await this.policyRepo.getPolicy(id);

    if (!policy) {
      throw new BusinessError(StatusCode.DATA_NOT_FOUND);
    }

    if (policy.isDefault) {
      throw new BusinessError(StatusCode.CANNOT_MODIFY_DEFAULT_POLICY);
    }

    await this.policyRepo.deletePolicy(id);

    return {
      id: policy.id,
    };
  }

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
    return this.policyRepo.listPolicies(query);
  }

  async getDetailPolicy(id: string) {
    const policy = await this.policyRepo.getDetailPolicy(id);

    if (!policy) {
      throw new BusinessError(StatusCode.DATA_NOT_FOUND);
    }

    return policy;
  }
}
