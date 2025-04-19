import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { PasswordRegex } from '../../../lib/contants';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password of the user',
    example: 'CurrentPass123!',
  })
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @ApiProperty({
    description: 'New password to set for the user',
    example: 'NewPass456!',
  })
  @IsNotEmpty()
  @Matches(PasswordRegex)
  newPassword: string;
}
