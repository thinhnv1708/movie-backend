export interface IIatRepository {
  getIat(userId: string);
  setIat(userId: string, iat: number, expiresIn: number);
}
