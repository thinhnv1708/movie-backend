import MessageMapping from './MessageMapping';
import StatusCode from './StatusCode';

export default class BusinessError extends Error {
  statusCode: StatusCode;
  message: string;
  args: Record<string, string | number | boolean>;

  constructor(
    statusCode: StatusCode,
    options?: {
      message?: string;
      args?: Record<string, string | number | boolean>;
    },
  ) {
    super(`${statusCode}`);

    const { message: forceMessage = '', args = {} } = options || {};
    const message = forceMessage || this.mapArgsToMessage(statusCode, args);

    this.message = message;
    this.statusCode = statusCode;
    this.args = args;
  }

  private mapArgsToMessage(
    statusCode: StatusCode,
    args?: Record<string, string | number | boolean>,
  ): string {
    let message = MessageMapping[statusCode];

    if (!message) {
      return '';
    }

    if (Object.keys(args).length === 0) {
      return message;
    }

    Object.entries(args).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, `${value}`);
    });

    return message;
  }
}
