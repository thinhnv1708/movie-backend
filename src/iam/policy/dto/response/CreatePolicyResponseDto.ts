import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';

class CreatePolicyData {
  @ApiProperty({
    description: 'The unique identifier of the created policy',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}

export class CreatePolicyResponseDto extends ApiDocumentResponse {
  @ApiProperty({ type: CreatePolicyData })
  data: CreatePolicyData;
}
