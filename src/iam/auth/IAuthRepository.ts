export interface IAuthRepository {
  getUserByEmail(email: string): Promise<{
    id: string;
    activated: boolean;
    isRoot: boolean;
    email: string;
    password: string;
  }>;

  getUserById(userId: string): Promise<{ id: string; activated: boolean }>;

  getUserActions(
    userId: string,
  ): Promise<{ id: string; path: string; method: string }[]>;

  updateLastAccess(userId: string, lastAccess: number): Promise<void>;

  getUserTokenByToken(token: string): Promise<{
    id: string;
    userId: string;
    token: string;
    createdAt: number;
    expiresAt: number;
  }>;

  updateActivatedUser(userId: string, password: string);

  updatePassword(userId: string, newPasswordHash: string): Promise<void>;
}
