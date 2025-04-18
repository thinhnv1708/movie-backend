import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';

class SendActivateUserData {
  @ApiProperty({
    example: 'Message sent successfully',
  })
  message: string;
}

export class SendActivateUserResponseDto extends ApiDocumentResponse {
  @ApiProperty({
    type: SendActivateUserData,
  })
  data: SendActivateUserData;
}
