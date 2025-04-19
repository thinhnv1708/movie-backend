import { ApiProperty } from '@nestjs/swagger';

export class GroupDto {
  @ApiProperty({
    description: 'Unique identifier for the group',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;
  
  @ApiProperty({
    description: 'Name of the group',
    example: 'Administrators'
  })
  name: string;
  
  @ApiProperty({
    description: 'Description of the group',
    example: 'Group with administrative privileges'
  })
  description: string;
  
  @ApiProperty({
    description: 'Timestamp when the group was created',
    example: 1617123456
  })
  createdAt: number;
  
  @ApiProperty({
    description: 'Timestamp when the group was last updated',
    example: 1617123789
  })
  updatedAt: number;
}
