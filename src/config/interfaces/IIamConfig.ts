export interface IIamConfig {
  activateUserUrl: string;
  activateUserTokenExpiresIn: number;
  passwordSecret: string;
  jwtAccessTokenSecret: string;
  jwtAccessTokenExpiresIn: number;
  jwtRefreshTokenSecret: string;
  jwtRefreshTokenExpiresIn: number;
  resetPasswordTokenExpiresIn: number;
  resetPasswordUrl: string;
}
