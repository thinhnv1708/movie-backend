import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  fullName?: string;

  @ApiProperty({
    description: 'Indicates if the user account is activated',
    example: true,
  })
  activated: boolean;

  @ApiProperty({
    description: 'Indicates if the user has root privileges',
    example: false,
  })
  isRoot: boolean;

  @ApiProperty({
    description: 'Timestamp when the user was logined',
    example: 1617123456,
  })
  lastLogin: number;

  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: 1617123456,
  })
  createdAt: number;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    example: 1617123789,
  })
  updatedAt: number;
}
