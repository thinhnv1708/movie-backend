import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../lib/ApiDocumentResponse';

class ActionRepsponseDto {
  @ApiProperty({
    description: 'Unique identifier of the action',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the feature this action belongs to',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  featureId: string;

  @ApiProperty({
    description: 'Name of the action',
    example: 'createUser',
  })
  name: string;

  @ApiProperty({
    description: 'Description of what the action does',
    example: 'Create a new user in the system',
  })
  description: string;

  @ApiProperty({
    description: 'HTTP method of the action',
    example: 'POST',
    enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
  method: string;

  @ApiProperty({
    description: 'API endpoint path of the action',
    example: '/iam/users',
  })
  path: string;
}

class ActionsData {
  @ApiProperty({
    description: 'Unique identifier of the feature',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  id: string;

  @ApiProperty({
    description: 'ID of the parent feature (if this is a sub-feature)',
    example: '123e4567-e89b-12d3-a456-426614174002',
    nullable: true,
  })
  parentId: string;

  @ApiProperty({
    description: 'Name of the feature',
    example: 'User Management',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the feature',
    example: 'Allows managing users in the system',
  })
  description: string;

  @ApiProperty({
    description: 'List of actions associated with this feature',
    type: [ActionRepsponseDto],
  })
  actions: ActionRepsponseDto[];
}

export class ActionsResponseDto extends ApiDocumentResponse {
  @ApiProperty({
    description: 'List of all features with their associated actions',
    type: [ActionsData],
  })
  data: ActionsData[];
}
