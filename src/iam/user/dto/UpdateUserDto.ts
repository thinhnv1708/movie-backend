import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Array of policy IDs to assign to the user',
    type: [String],
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174001',
    ],
    required: false,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  policyIds?: string[];

  @ApiProperty({
    description: 'Array of group IDs to assign to the user',
    type: [String],
    example: [
      '123e4567-e89b-12d3-a456-426614174002',
      '123e4567-e89b-12d3-a456-426614174003',
    ],
    required: false,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  groupIds?: string[];
}