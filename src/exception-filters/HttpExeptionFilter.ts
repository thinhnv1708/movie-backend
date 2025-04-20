import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import BusinessError from '../lib/BusinessError';
import HttpStatusMapping from '../lib/HttpStatusMapping';
import IResponseData from '../lib/interfaces/IResponseData';
import ResponseDataBuilder from '../lib/ResponseDataBuilder';

@Catch(BusinessError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = exception.statusCode;
    const message = exception.message;
    const httpStatus = HttpStatusMapping[statusCode] || HttpStatus.BAD_REQUEST;

    const responseData: IResponseData = new ResponseDataBuilder()
      .withStatusCode(statusCode)
      .withMessage(message)
      .build();

    response.status(httpStatus).json(responseData);
  }
}
