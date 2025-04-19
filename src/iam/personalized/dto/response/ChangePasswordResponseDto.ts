import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordResponseDto {
  @ApiProperty({
    description: 'Message indicating the password was changed successfully',
    example: 'Password changed successfully',
  })
  message: string;
}