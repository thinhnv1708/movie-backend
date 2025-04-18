import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';

class CreateUserData {
  @ApiProperty({
    description: 'The unique identifier of the created user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}

export class CreateUserResponseDto extends ApiDocumentResponse {
  @ApiProperty({
    type: CreateUserData,
  })
  data: CreateUserData;
}