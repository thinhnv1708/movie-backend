import getEnv from '../lib/utils/getEnv';
import ISendMessageConfig from './interfaces/ISendMessageConfig';

export default (): { sendMessage: ISendMessageConfig } => {
  return {
    sendMessage: {
      cooldown:
        Number(getEnv('SEND_MESSAGE_COOLDOWN', { isOptional: true })) ??
        60 * 5,
    },
  };
};
