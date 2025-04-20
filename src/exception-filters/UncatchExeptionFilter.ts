import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import HttpStatusMapping from '../lib/HttpStatusMapping';
import IResponseData from '../lib/interfaces/IResponseData';
import MessageMapping from '../lib/MessageMapping';
import ResponseDataBuilder from '../lib/ResponseDataBuilder';
import StatusCode from '../lib/StatusCode';

@Catch()
export class UncatchExeptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = StatusCode.INTERNAL_SERVER_ERROR;
    const httpStatus = HttpStatusMapping[statusCode];

    console.error(exception);

    const responseData: IResponseData = new ResponseDataBuilder()
      .withStatusCode(statusCode)
      .withMessage(MessageMapping[statusCode])
      .build();

    response.status(httpStatus).json(responseData);
  }
}
