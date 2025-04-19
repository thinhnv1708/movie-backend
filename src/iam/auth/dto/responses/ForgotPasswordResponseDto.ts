import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';

class ForgotPasswordData {
  @ApiProperty({
    description: 'Message indicating password reset email status',
    example: 'Password reset link has been sent to your email',
  })
  message: string;
}

export class ForgotPasswordResponseDto extends ApiDocumentResponse {
  @ApiProperty({
    type: ForgotPasswordData,
  })
  data: ForgotPasswordData;
}
