import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address that serves as the unique identifier',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Array of policy IDs to assign to the user',
    type: [String],
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174001',
    ],
  })
  @IsString({ each: true })
  @IsArray()
  policyIds: string[];

  @ApiProperty({
    description: 'Array of group IDs to assign to the user',
    type: [String],
    example: [
      '123e4567-e89b-12d3-a456-426614174002',
      '123e4567-e89b-12d3-a456-426614174003',
    ],
  })
  @IsString({ each: true })
  @IsArray()
  groupIds: string[];
}
