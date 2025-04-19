import idGenerator from '../idGenerator';
import getTimestampSeconds from '../utils/getTimestampSeconds';
import { UserTokenHelper } from './UserTokenHelper';

export const generateUserToken = (
  userTokenHelper: UserTokenHelper,
  data: {
    userId: string;
    expiresIn: number; // seconds
  },
) => {
  const { userId, expiresIn } = data;
  const token = userTokenHelper.generateToken();
  const now = getTimestampSeconds();
  const expiresAt = now + expiresIn;

  const hashedToken = userTokenHelper.hashToken(token);

  const userToken = {
    id: idGenerator(),
    userId,
    token: hashedToken,
    createdAt: now,
    updatedAt: now,
    expiresAt,
  };

  return userToken;
};
