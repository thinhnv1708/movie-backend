import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: 'The name of the group',
    example: 'Administrators',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Optional description of the group',
    example: 'Group with administrative privileges',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Array of policy IDs associated with this group',
    type: [String],
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174001',
    ],
  })
  @IsString({ each: true })
  @IsArray()
  policyIds: string[];
}
