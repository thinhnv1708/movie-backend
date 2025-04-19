export interface IUserRepository {
  getUsers(params: {
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
  }>;

  getUserById(id: string): Promise<{
    id: string;
    isRoot: boolean;
    activated: boolean;
    email: string;
    password: string;
    lastAccess: number;
    createdAt: number;
    updatedAt: number;
  }>;

  getUserByEmail(email: string): Promise<{
    id: string;
    isRoot: boolean;
    activated: boolean;
    email: string;
    password: string;
    lastAccess: number;
    createdAt: number;
    updatedAt: number;
  }>;

  getPoliciesByIds(policyIds: string[]): Promise<{ id: string }[]>;

  getGroupsByIds(groupIds: string[]): Promise<{ id: string }[]>;

  createUser(data: {
    id: string;
    isRoot: boolean;
    activated: boolean;
    email: string;
    password: string;
    policyIds: string[];
    groupIds: string[];
    createdAt: number;
    updatedAt: number;
  });

  updateUser(
    userId: string,
    data: Partial<{
      policyIds: string[];
      groupIds: string[];
    }>,
  );

  saveUserToken(data: {
    id: string;
    userId: string;
    token: string;
    createdAt: number;
    expiresAt: number;
  }): Promise<void>;

  updateActivatedUser(userId: string, password: string);

  deleteUser(userId: string);

  getGroupsOfUser(userId: string): Promise<{ id: string; name: string }[]>;
  getPoliciesOfUser(userId: string): Promise<{ id: string; name: string }[]>;
  getPoliciesOfGroups(
    groupIds: string[],
  ): Promise<{ id: string; name: string }[]>;
}
