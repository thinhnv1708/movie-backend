import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './UserDto';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';

class UsersData {
  @ApiProperty({
    description: 'Total number of users available',
    example: 42,
  })
  total: number;

  @ApiProperty({
    description: 'Array of users for the current page',
    type: [UserDto],
  })
  items: UserDto[];
}

export class UsersResponseDto extends ApiDocumentResponse {
  @ApiProperty({ type: UsersData })
  data: UsersData;
}