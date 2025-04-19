import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';

class CreateGroupData {
  @ApiProperty({
    description: 'The unique identifier of the created group',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}

export class CreateGroupResponseDto extends ApiDocumentResponse {
  @ApiProperty({
    type: CreateGroupData,
  })
  data: CreateGroupData;
}
