import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { PasswordRegex } from '../../../lib/contants';

export class ActivateUserDto {
  @ApiProperty({
    description: 'Token for user activation',
    example: '1a2b3c4d5e6f7g8h9i0j',
  })
  @IsString()
  token: string;

  @ApiProperty({
    description: 'User password',
    example: 'securepassword123',
  })
  @Matches(PasswordRegex)
  password: string;
}
