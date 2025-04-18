export interface IAuthRepository {
  getUserByEmail(email: string): Promise<{
    id: string;
    activated: boolean;
    isRoot: boolean;
    email: string;
    password: string;
  }>;

  getUserById(userId: string): Promise<{ id: string }>;

  getUserActions(
    userId: string,
  ): Promise<{ id: string; path: string; method: string }[]>;

  updateLastAccess(userId: string, lastAccess: number): Promise<void>;
}
