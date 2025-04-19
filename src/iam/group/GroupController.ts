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
import { ResponseDataInterceptor } from '../../interceptors/ResponseDataInterceptor';
import { LimitConverterPipe } from '../../lib/pipes/LimitConverterPipe';
import { PageConverterPipe } from '../../lib/pipes/PageConverterPipe';
import { GroupService } from './GroupService';
import { CreateGroupDto } from './dto/CreateGroupDto';
import { UpdateGroupDto } from './dto/UpdateGroupDto';

import { AuthenticationGuard } from '../../guards/AuthenticationGuard';
import { AuthorizationGuard } from '../../guards/AuthorizationGuard';
import { CreateGroupResponseDto } from './dto/response/CreateGroupResponseDto';
import { GroupDetailResponseDto } from './dto/response/GroupDetailResponseDto';
import { GroupsResponseDto } from './dto/response/GroupsResponseDto';

@ApiTags('Groups')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@UseInterceptors(ResponseDataInterceptor)
@Controller('/iam/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({ summary: 'Get a list of groups' })
  @ApiOkResponse({
    description: 'List of groups retrieved successfully',
    type: GroupsResponseDto,
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'name', required: false })
  @Get('/')
  async getGroups(
    @Query('page', new PageConverterPipe()) page?: number,
    @Query('limit', new LimitConverterPipe()) limit?: number,
    @Query('name') name?: string,
  ) {
    return this.groupService.listGroups({
      page,
      limit,
      name,
    });
  }

  @ApiOperation({ summary: 'Get a group by ID' })
  @ApiOkResponse({
    description: 'Group retrieved successfully',
    type: GroupDetailResponseDto,
  })
  @Get('/:id')
  getDetailGroup(@Param('id') id: string) {
    return this.groupService.getDetailGroup(id);
  }

  @ApiOperation({ summary: 'Create a new group' })
  @ApiOkResponse({
    description: 'Group created successfully',
    type: CreateGroupResponseDto,
  })
  @Post('/')
  async createGroup(@Body() body: CreateGroupDto) {
    return this.groupService.createGroup(body);
  }

  @ApiOperation({ summary: 'Update a group' })
  @ApiOkResponse({
    description: 'Group updated successfully',
    type: CreateGroupResponseDto,
  })
  @Patch('/:id')
  async updateGroup(@Param('id') id: string, @Body() body: UpdateGroupDto) {
    return this.groupService.updateGroup(id, body);
  }

  @ApiOperation({ summary: 'Delete a group' })
  @ApiOkResponse({
    description: 'Group deleted successfully',
    type: CreateGroupResponseDto,
  })
  @Delete('/:id')
  async deleteGroup(@Param('id') id: string) {
    return this.groupService.deleteGroup(id);
  }
}
