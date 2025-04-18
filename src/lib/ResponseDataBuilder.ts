import MessageMapping from './MessageMapping';
import StatusCode from './StatusCode';
import IResponseData from './interfaces/IResponseData';

export default class ResponseDataBuilder<T = any> {
  private statusCode = StatusCode.SUCCESS;
  private message: string;
  private data: T;

  withStatusCode(statusCode: StatusCode): ResponseDataBuilder<T> {
    this.statusCode = statusCode;
    return this;
  }

  withMessage(message: string): ResponseDataBuilder<T> {
    this.message = message;
    return this;
  }

  withData(data: T): ResponseDataBuilder<T> {
    this.data = data;
    return this;
  }

  build(): IResponseData<T> {
    return {
      statusCode: this.statusCode,
      message: this.message || MessageMapping[this.statusCode],
      data: this.data,
    };
  }
}
