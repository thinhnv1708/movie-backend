import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticationGuard } from '../../guards/AuthenticationGuard';
import { AuthorizationGuard } from '../../guards/AuthorizationGuard';
import { ResponseDataInterceptor } from '../../interceptors/ResponseDataInterceptor';
import { LimitConverterPipe } from '../../lib/pipes/LimitConverterPipe';
import { PageConverterPipe } from '../../lib/pipes/PageConverterPipe';
import { UserService } from './UserService';
import { CreateUserDto } from './dto/CreateUserDto';
import { SendMessageActivateUserDto } from './dto/SendMessageActivateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { CreateUserResponseDto } from './dto/response/CreateUserResponseDto';
import { SendActivateUserResponseDto } from './dto/response/SendActivateUserResponseDto';
import { UserDetailResponseDto } from './dto/response/UserDetailResponseDto';
import { UsersResponseDto } from './dto/response/UsersResponseDto';

@ApiTags('User Management')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@UseInterceptors(ResponseDataInterceptor)
@Controller('/iam/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get a list of users' })
  @ApiOkResponse({
    description: 'List of users retrieved successfully',
    type: UsersResponseDto,
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'activated', required: false, enum: ['true', 'false'] })
  @Get('/')
  async getUsers(
    @Query('page', new PageConverterPipe()) page?: number,
    @Query('limit', new LimitConverterPipe()) limit?: number,
    @Query('email') email?: string,
    @Query('activated') activated?: string,
  ) {
    return this.userService.getUsers({
      page,
      limit,
      email,
      activated: activated === undefined ? undefined : activated === 'true',
    });
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiOkResponse({
    description: 'User retrieved successfully',
    type: UserDetailResponseDto,
  })
  @Get('/:id')
  getUserDetails(@Param('id') id: string) {
    return this.userService.getUserDetails(id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    description: 'User created successfully',
    type: CreateUserResponseDto,
  })
  @Post('/')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @ApiOperation({
    summary: 'Send activation email to user',
    description: 'Sends an email with activation link to the specified user',
  })
  @ApiOkResponse({
    description: 'Activation email sent successfully',
    type: SendActivateUserResponseDto,
  })
  @Post('/sendMessageActivateUser')
  sendMessageActivateUser(@Body() body: SendMessageActivateUserDto) {
    return this.userService.sendMessageActivateUser(body.userId);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({
    description: 'User updated successfully',
    type: CreateUserResponseDto,
  })
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiOkResponse({
    description: 'User deleted successfully',
    type: CreateUserResponseDto,
  })
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
