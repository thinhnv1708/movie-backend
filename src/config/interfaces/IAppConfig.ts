export default interface IAppConfig {
  deploymentEnv: string | 'development' | 'production' | 'test';
  port: number;
  logoUrl: string;
}
