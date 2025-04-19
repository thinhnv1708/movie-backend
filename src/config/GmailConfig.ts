import getEnv from '../lib/utils/getEnv';
import IGmailConfig from './interfaces/IGmailConfig';

export default (): { gmail: IGmailConfig } => ({
  gmail: {
    gmail: getEnv('GMAIL'),
    appPassword: getEnv('GMAIL_APP_PASSWORD'),
  },
});
