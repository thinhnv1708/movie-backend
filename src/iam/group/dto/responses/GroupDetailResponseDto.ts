import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';
import { GroupDto } from './GroupDto';

class PolicyDto {
  @ApiProperty({
    description: 'Unique identifier for the policy',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the policy',
    example: 'ReadOnlyAccess',
  })
  name: string;

  @ApiProperty({
    description: 'Policy is default or not',
    example: false,
  })
  isDefault: boolean;
}

class GroupDetailData extends GroupDto {
  @ApiProperty({
    description: 'Array of policies associated with this group',
    type: [PolicyDto],
  })
  policies: PolicyDto[];
}

export class GroupDetailResponseDto extends ApiDocumentResponse {
  @ApiProperty({
    type: GroupDetailData,
  })
  data: GroupDetailData;
}
