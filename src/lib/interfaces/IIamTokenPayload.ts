export default interface IIamTokenPayload {
  id: string;
  userId: string;
  isRoot: boolean;
  iat: number; // issued at
  exp: number; // expiration time
}
