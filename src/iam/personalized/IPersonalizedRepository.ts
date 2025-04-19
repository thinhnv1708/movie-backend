export interface IPersonalizedRepository {
  getUserById(id: string): Promise<{
    id: string;
    activated: boolean;
    email: string;
    password: string;
  }>;

  updateUserPassword(
    userId: string,
    newPassword: string,
    updatedAt: number,
  ): Promise<void>;
  
  getUserInfo(userId: string): Promise<{
    id: string;
    email: string;
    isRoot: boolean;
    activated: boolean;
    lastAccess: number;
    createdAt: number;
    updatedAt: number;
  }>;
}
