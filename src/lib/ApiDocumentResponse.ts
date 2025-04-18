import { ApiProperty } from '@nestjs/swagger';
import IResponseData from './interfaces/IResponseData';
import StatusCode from './StatusCode';

export class ApiDocumentResponse implements IResponseData {
  @ApiProperty({
    description: 'Business status code',
    example: StatusCode.SUCCESS,
  })
  statusCode: StatusCode;

  @ApiProperty({
    description: 'Response message',
    example: 'Success',
  })
  message: string;
}
