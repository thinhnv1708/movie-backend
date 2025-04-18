import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePolicyDto {
  @ApiProperty({
    description: 'Policy name - should be descriptive of the permissions it grants',
    example: 'ReadOnlyAccess'
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Optional description explaining the purpose of this policy and what access it grants',
    example: 'Provides read-only access to all resources in the system'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'List of action IDs that this policy will grant permission to execute',
    minItems: 1,
    type: [String],
    example: ['123e4567-e89b-12d3-a456-426614174001', '123e4567-e89b-12d3-a456-426614174002']
  })
  @IsString({ each: true })
  @ArrayNotEmpty()
  actionIds: string[];
}
