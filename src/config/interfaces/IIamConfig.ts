export interface IIamConfig {
  activateUserUrl: string;
  activateUserTokenExpiresIn: number;
  passwordSecret: string;
  jwtAccessTokenSecret: string;
  jwtAccessTokenExpiresIn: number; // 1 hour in seconds
  jwtRefreshTokenSecret: string;
  jwtRefreshTokenExpiresIn: number; // 1 day in seconds
  jwtResetTokenSecret: string;
  resetTokenExpiresIn: number; // 24 hours in seconds
  resetPasswordUrl: string;
}
