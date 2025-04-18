import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDataInterceptor } from '../../lib/interceptors/ResponseDataInterceptor';
import { AuthService } from './AuthService';
import { LoginDto } from './dto/LoginDto';
import { RefreshTokenDto } from './dto/RefreshTokenDto';
import { AuthTokensResponseDto } from './dto/responses/AuthTokensResponseDto';

@ApiTags('Authentication')
@UseInterceptors(ResponseDataInterceptor)
@Controller('/iam/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login to the system' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthTokensResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials or user not activated',
  })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token refresh successful',
    type: AuthTokensResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired refresh token',
  })
  @Post('/refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}