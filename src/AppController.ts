import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { AppService } from './AppService';
import { ApiDocumentResponse } from './lib/ApiDocumentResponse';
import { ResponseDataInterceptor } from './interceptors/ResponseDataInterceptor';

class HealthResponseDto extends ApiDocumentResponse {
  @ApiProperty({
    example: "I/'m good!",
  })
  data: string;
}

@UseInterceptors(ResponseDataInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    type: HealthResponseDto,
  })
  @Get('/health')
  health() {
    return this.appService.health();
  }
}
