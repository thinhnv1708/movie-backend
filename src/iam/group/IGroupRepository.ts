export interface IGroupRepository {
  getGroup(id: string): Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: number;
    updatedAt: number;
  }>;

  createGroup(data: {
    id: string;
    name: string;
    description: string;
    policyIds: string[];
    createdAt: number;
    updatedAt: number;
  });

  getPoliciesByIds(policyIds: string[]): Promise<{ id: string }[]>;

  updateGroup(data: {
    id: string;
    name?: string;
    description?: string;
    policyIds?: string[];
    updatedAt?: number;
  });

  deleteGroup(id: string);

  listGroups(query: {
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
  }>;

  getDetailGroup(id: string): Promise<{
    id: string;
    name: string;
    description: string;
    policies: {
      id: string;
      name: string;
    }[];
    createdAt: number;
    updatedAt: number;
  }>;
}