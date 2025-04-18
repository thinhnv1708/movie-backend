import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import BusinessError from '../lib/BusinessError';
import HttpStatusMapping from '../lib/HttpStatusMapping';
import IResponseData from '../lib/interfaces/IResponseData';
import ResponseDataBuilder from '../lib/ResponseDataBuilder';
import StatusCode from '../lib/StatusCode';
import HTTP_STATUS from '../lib/HttpStatus';

@Catch(BusinessError)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: BusinessError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = exception.statusCode;

    const httpStatus = HttpStatusMapping[statusCode] || HTTP_STATUS.BAD_REQUEST;

    const responseData: IResponseData = new ResponseDataBuilder()
      .withStatusCode(statusCode)
      .withMessage(exception.message)
      .build();

    response.status(httpStatus).json(responseData);
  }
}
