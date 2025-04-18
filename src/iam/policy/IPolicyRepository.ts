export interface IPolicyRepository {
  getPolicy(id: string): Promise<{
    id: string;
    name: string;
    description: string;
    isDefault: boolean;
    createdAt: number;
    updatedAt: number;
  }>;

  createPolicy(data: {
    id: string;
    name: string;
    description: string;
    isDefault: boolean;
    actionIds: string[];
    createdAt: number;
    updatedAt: number;
  });

  getActionsByIds(actionIds: string[]): Promise<{ id: string }[]>;

  updatePolicy(data: {
    id: string;
    name?: string;
    description?: string;
    actionIds?: string[];
    updatedAt?: number;
  });

  deletePolicy(id: string);

  listPolicies(query: {
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
  }>;

  getDetailPolicy(id: string): Promise<{
    id: string;
    name: string;
    description: string;
    isDefault: boolean;
    actions: {
      id: string;
      name: string;
    }[];
    createdAt: number;
    updatedAt: number;
  }>;
}
