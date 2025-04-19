import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';

class ActivateUserData {
  @ApiProperty({
    description: 'Message describing the result of the activation',
    example: 'User activated successfully',
  })
  message: string;
}

export class ActivateUserResponseDto extends ApiDocumentResponse {
  @ApiProperty({
    type: ActivateUserData,
  })
  data: ActivateUserData;
}
