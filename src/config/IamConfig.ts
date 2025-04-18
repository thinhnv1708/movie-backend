import getEnv from '../lib/utils/getEnv';
import { IIamConfig } from './interfaces/IIamConfig';

export default (): { iam: IIamConfig } => ({
  iam: {
    activateUserUrl: getEnv('ACTIVATE_USER_URL'),
    activateUserTokenExpiresIn:
      Number(getEnv('ACTIVATE_USER_TOKEN_EXPIRES_IN', { isOptional: true })) ??
      60 * 60 * 24, // 1 day
    passwordSecret: getEnv('PASSWORD_SECRET'),
    jwtAccessTokenSecret:
      getEnv('JWT_ACCESS_TOKEN_SECRET', { isOptional: true }) ??
      getEnv('PASSWORD_SECRET'), // Fallback to PASSWORD_SECRET if not provided
    jwtAccessTokenExpiresIn:
      Number(getEnv('JWT_ACCESS_TOKEN_EXPIRES_IN', { isOptional: true })) ??
      60 * 60, // 1 hour
    jwtRefreshTokenSecret:
      getEnv('JWT_REFRESH_TOKEN_SECRET', { isOptional: true }) ??
      getEnv('PASSWORD_SECRET'), // Fallback to PASSWORD_SECRET if not provided
    jwtRefreshTokenExpiresIn:
      Number(getEnv('JWT_REFRESH_TOKEN_EXPIRES_IN', { isOptional: true })) ??
      60 * 60 * 24, // 1 day
  },
});
