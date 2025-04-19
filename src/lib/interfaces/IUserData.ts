export default interface IUserData {
  id: string;
  userId: string;
  isRoot: boolean;
  iat: number; // issued at
  exp: number; // expiration time
}
