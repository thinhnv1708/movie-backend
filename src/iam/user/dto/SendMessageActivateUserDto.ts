import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendMessageActivateUserDto {
  @ApiProperty()
  @IsString()
  userId: string;
}
