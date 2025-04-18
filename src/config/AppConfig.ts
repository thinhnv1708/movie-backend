import getEnv from '../lib/utils/getEnv';
import IAppConfig from './interfaces/IAppConfig';

export default (): { app: IAppConfig } => ({
  app: {
    port: Number(getEnv('PORT', { isOptional: true })) || 3000,
  },
});
