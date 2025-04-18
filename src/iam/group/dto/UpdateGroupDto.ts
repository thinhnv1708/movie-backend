import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({
    description: 'Updated name of the group',
    example: 'Senior Administrators',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Updated description of the group',
    example: 'Group with elevated administrative privileges',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Updated array of policy IDs associated with this group',
    type: [String],
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174002',
    ],
    required: false,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  policyIds?: string[];
}
