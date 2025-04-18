import StatusCode from './StatusCode';

export default class BusinessError extends Error {
  statusCode: StatusCode;
  message: string;
  constructor(statusCode: StatusCode, message?: string) {
    super(`${statusCode}: ${message}`);
    this.message = message;
    this.statusCode = statusCode;
  }
}
