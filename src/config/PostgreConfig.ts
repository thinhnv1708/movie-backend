import getEnv from '../lib/utils/getEnv';
import IPostgreConfig from './interfaces/IPostgreConfig';

export default (): { postgre: IPostgreConfig } => ({
  postgre: {
    url: getEnv('POSTGRES_URL'),
  },
});
