import getEnv from '../lib/utils/getEnv';
import IRedisConfig from './interfaces/IRedisConfig';

export default (): { redis: IRedisConfig } => {
  return {
    redis: {
      url: getEnv('REDIS_URL'),
    },
  };
};
