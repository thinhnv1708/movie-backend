import { ApiProperty } from '@nestjs/swagger';

export class MyInfoResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  })
  id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Whether the user is a root user',
    example: false,
  })
  isRoot: boolean;

  @ApiProperty({
    description: 'Whether the user account is activated',
    example: true,
  })
  activated: boolean;

  @ApiProperty({
    description: 'Last access timestamp (Unix timestamp in seconds)',
    example: 1712345678,
  })
  lastAccess: number;

  @ApiProperty({
    description: 'Account creation timestamp (Unix timestamp in seconds)',
    example: 1712345000,
  })
  createdAt: number;

  @ApiProperty({
    description: 'Account last update timestamp (Unix timestamp in seconds)',
    example: 1712345678,
  })
  updatedAt: number;
}