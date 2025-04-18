import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePolicyDto {
  @ApiPropertyOptional({
    description: 'Updated policy name - should be descriptive of the permissions it grants',
    example: 'EnhancedReadAccess'
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Updated description explaining the purpose of this policy and what access it grants',
    example: 'Provides enhanced read access including reporting functionality'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated list of action IDs that this policy will grant permission to execute - replaces existing actions',
    minItems: 1,
    type: [String],
    example: ['123e4567-e89b-12d3-a456-426614174001', '123e4567-e89b-12d3-a456-426614174003']
  })
  @IsOptional()
  @IsString({ each: true })
  @ArrayNotEmpty()
  actionIds: string[];
}
