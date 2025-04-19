import getEnv from '../lib/utils/getEnv';
import { IIamConfig } from './interfaces/IIamConfig';

export default (): { iam: IIamConfig } => ({
  iam: {
    //activate user
    activateUserUrl: getEnv('ACTIVATE_USER_URL'),
    activateUserTokenExpiresIn:
      Number(getEnv('ACTIVATE_USER_TOKEN_EXPIRES_IN', { isOptional: true })) ??
      60 * 60 * 24, // 1 day
    passwordSecret: getEnv('PASSWORD_SECRET'),

    jwtAccessTokenSecret: getEnv('JWT_ACCESS_TOKEN_SECRET', {
      isOptional: true,
    }),

    // access token
    jwtAccessTokenExpiresIn:
      Number(getEnv('JWT_ACCESS_TOKEN_EXPIRES_IN', { isOptional: true })) ??
      60 * 60, // 1 hour

    // refresh token
    jwtRefreshTokenSecret: getEnv('JWT_REFRESH_TOKEN_SECRET', {
      isOptional: true,
    }),
    jwtRefreshTokenExpiresIn:
      Number(getEnv('JWT_REFRESH_TOKEN_EXPIRES_IN', { isOptional: true })) ??
      60 * 60 * 24, // 1 day
    // reset password
    resetPasswordUrl: getEnv('RESET_PASSWORD_URL'),
    resetPasswordTokenExpiresIn:
      Number(getEnv('RESET_PASSWORD_TOKEN_EXPIRES_IN', { isOptional: true })) ??
      60 * 60 * 24, // 24 hours
  },
});
