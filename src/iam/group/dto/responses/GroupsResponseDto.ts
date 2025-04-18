import { ApiProperty } from '@nestjs/swagger';
import { GroupDto } from './GroupDto';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';

class GroupsData {
  @ApiProperty({
    description: 'Total number of groups available',
    example: 42,
  })
  total: number;

  @ApiProperty({
    description: 'Array of groups for the current page',
    type: [GroupDto],
  })
  items: GroupDto[];
}

export class GroupsResponseDto extends ApiDocumentResponse {
  @ApiProperty({ type: GroupsData })
  data: GroupsData;
}
