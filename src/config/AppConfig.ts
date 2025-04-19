import getEnv from '../lib/utils/getEnv';
import IAppConfig from './interfaces/IAppConfig';

export default (): { app: IAppConfig } => ({
  app: {
    deploymentEnv:
      getEnv('DEPLOYMENT_ENV', { isOptional: true }) || 'development',
    port: Number(getEnv('PORT', { isOptional: true })) || 3000,
    logoUrl: getEnv('LOGO_URL', { isOptional: true }),
  },
});
