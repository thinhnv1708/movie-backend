import StatusCode from '../StatusCode';

export default interface IResponseData<T = any> {
  statusCode: StatusCode;
  message: string;
  data?: T;
}
