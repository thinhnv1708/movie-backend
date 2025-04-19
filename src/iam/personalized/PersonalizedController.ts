import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticationGuard } from '../../guards/AuthenticationGuard';
import { ResponseDataInterceptor } from '../../interceptors/ResponseDataInterceptor';
import { PersonalizedService } from './PersonalizedService';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import { ChangePasswordResponseDto, MyInfoResponseDto } from './dto/response';
import { UserData } from '../../lib/UserData';
import IUserData from '../../lib/interfaces/IUserData';

@ApiTags('Personalized Account Management')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard) // Only requires authentication, not authorization
@UseInterceptors(ResponseDataInterceptor)
@Controller('/iam/personalized')
export class PersonalizedController {
  constructor(private readonly personalizedService: PersonalizedService) {}

  @ApiOperation({ summary: 'Change current user password' })
  @ApiOkResponse({
    description: 'Password changed successfully',
    type: ChangePasswordResponseDto,
  })
  @Post('/changePassword')
  changePassword(
    @UserData() userData: IUserData,
    @Body() body: ChangePasswordDto,
  ) {
    return this.personalizedService.changePassword({
      userId: userData.userId,
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
    });
  }
  
  @ApiOperation({ summary: 'Get current user information' })
  @ApiOkResponse({
    description: 'Current user information retrieved successfully',
    type: MyInfoResponseDto,
  })
  @Get('/myInfo')
  getMyInfo(@UserData() userData: IUserData) {
    return this.personalizedService.getMyInfo(userData.userId);
  }
}
