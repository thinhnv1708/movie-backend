import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PolicyDto {
  @ApiProperty({ 
    description: 'The unique identifier of the policy',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({ 
    description: 'The name of the policy',
    example: 'ReadOnlyAccess'
  })
  name: string;

  @ApiPropertyOptional({ 
    description: 'The description of the policy',
    example: 'Provides read-only access to resources'
  })
  description?: string;

  @ApiProperty({ 
    description: 'Whether the policy is a default policy',
    example: false
  })
  isDefault: boolean;

  @ApiProperty({ 
    description: 'The creation timestamp of the policy',
    example: 1617123456
  })
  createdAt: number;

  @ApiProperty({ 
    description: 'The last update timestamp of the policy',
    example: 1617123789
  })
  updatedAt: number;
}
