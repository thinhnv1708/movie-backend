import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';
import { UserDto } from './UserDto';

class GroupDto {
  @ApiProperty({
    description: 'Unique identifier for the group',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the group',
    example: 'Administrators',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the group',
    example: 'Group with administrative privileges',
  })
  description: string;
}

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

class UserDetailData extends UserDto {
  @ApiProperty({
    description: 'Array of groups this user belongs to',
    type: [GroupDto],
  })
  groups: GroupDto[];

  @ApiProperty({
    description: 'Array of policies directly assigned to this user',
    type: [PolicyDto],
  })
  policies: PolicyDto[];
}

export class UserDetailResponseDto extends ApiDocumentResponse {
  @ApiProperty({
    type: UserDetailData,
  })
  data: UserDetailData;
}