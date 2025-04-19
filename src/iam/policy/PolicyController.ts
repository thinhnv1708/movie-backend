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
import { CreatePolicyDto } from './dto/CreatePolicyDto';
import { CreatePolicyResponseDto } from './dto/response/CreatePolicyResponseDto';
import { PoliciesResponseDto } from './dto/response/PoliciesResponseDto';
import { PolicyDetailResponseDto } from './dto/response/PolicyDetailResponseDto';
import { UpdatePolicyDto } from './dto/UpdatePolicyDto';
import { PolicyService } from './PolicyService';

@ApiTags('Policies')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@UseInterceptors(ResponseDataInterceptor)
@Controller('/iam/policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @ApiOperation({ summary: 'Get a list of policies' })
  @ApiOkResponse({
    description: 'List of policies retrieved successfully',
    type: PoliciesResponseDto,
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'isDefault', required: false, enum: ['true', 'false'] })
  @Get('/')
  async getPolicies(
    @Query('page', new PageConverterPipe()) page?: number,
    @Query('limit', new LimitConverterPipe()) limit?: number,
    @Query('name') name?: string,
    @Query('isDefault') isDefault?: string,
  ) {
    return this.policyService.listPolicies({
      page,
      limit,
      name,
      isDefault: isDefault == undefined ? undefined : JSON.parse(isDefault),
    });
  }

  @ApiOperation({ summary: 'Get a policy by ID' })
  @ApiOkResponse({
    description: 'Policy retrieved successfully',
    type: PolicyDetailResponseDto,
  })
  @Get('/:id')
  getDetailPolicy(@Param('id') id: string) {
    return this.policyService.getDetailPolicy(id);
  }

  @ApiOperation({ summary: 'Create a new policy' })
  @ApiOkResponse({
    description: 'Policy created successfully',
    type: CreatePolicyResponseDto,
  })
  @Post('/')
  async createPolicy(@Body() body: CreatePolicyDto) {
    return this.policyService.createPolicy(body);
  }

  @ApiOperation({ summary: 'Update a policy' })
  @ApiOkResponse({
    description: 'Policy updated successfully',
    type: CreatePolicyResponseDto,
  })
  @Patch('/:id')
  async updatePolicy(@Param('id') id: string, @Body() body: UpdatePolicyDto) {
    return this.policyService.updatePolicy(id, body);
  }

  @ApiOperation({ summary: 'Delete a policy' })
  @ApiOkResponse({
    description: 'Policy deleted successfully',
    type: CreatePolicyResponseDto,
  })
  @Delete('/:id')
  async deletePolicy(@Param('id') id: string) {
    return this.policyService.deletePolicy(id);
  }
}
