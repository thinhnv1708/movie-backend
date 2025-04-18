import { ApiProperty } from '@nestjs/swagger';

export class ActivateUserResponseDto {
  @ApiProperty({
    description: 'Status of the activation operation',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'Message describing the result of the activation',
    example: 'User activated successfully'
  })
  message: string;

  @ApiProperty({
    description: 'User ID of the activated account',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  userId: string;
}