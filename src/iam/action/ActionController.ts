import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticationGuard } from '../../guards/AuthenticationGuard';
import { AuthorizationGuard } from '../../guards/AuthorizationGuard';
import { ResponseDataInterceptor } from '../../interceptors/ResponseDataInterceptor';
import { ActionService } from './ActionService';
import { ActionsResponseDto } from './dto/ActionsResponseDto';

@ApiTags('Actions')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@UseInterceptors(ResponseDataInterceptor)
@Controller('/iam/action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @ApiOperation({
    summary: 'Get all features with their actions',
    description:
      'Retrieves a hierarchical list of all features in the system and their associated actions for IAM purposes',
  })
  @ApiOkResponse({
    description: 'Returns a list of all features with their associated actions',
    type: ActionsResponseDto,
  })
  @Get('/')
  async getActions() {
    return this.actionService.getActions();
  }
}
