import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDataInterceptor } from '../../interceptors/ResponseDataInterceptor';
import { AuthService } from './AuthService';
import { ActivateUserDto } from './dto/ActivateUserDto';
import { LoginDto } from './dto/LoginDto';
import { RefreshTokenDto } from './dto/RefreshTokenDto';
import { ActivateUserResponseDto } from './dto/responses/ActivateUserResponseDto';
import { LoginResponseDto } from './dto/responses/LoginResponseDto';

@ApiTags('Authentication')
@UseInterceptors(ResponseDataInterceptor)
@Controller('/iam/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Activate user account',
    description: 'Activates a user account using the provided token',
  })
  @ApiOkResponse({
    description: 'User activated successfully',
    type: ActivateUserResponseDto,
  })
  @Post('/activate')
  activateUser(@Body() body: ActivateUserDto) {
    return this.authService.activateUser(body);
  }

  @ApiOperation({ summary: 'Login to the system' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token refresh successful',
    type: LoginResponseDto,
  })
  @Post('/refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
