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
import { CategoryService } from './CategoryService';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto';
import { CategoriesResponseDto } from './dto/response/CategoriesResponseDto';
import { CategoryResponseDto } from './dto/response/CategoryResponseDto';

@ApiTags('Category Metadata management')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@UseInterceptors(ResponseDataInterceptor)
@Controller('/mm/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get a list of categories' })
  @ApiOkResponse({
    description: 'List of categories retrieved successfully',
    type: CategoriesResponseDto,
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'name', required: false })
  @Get('/')
  async getCategories(
    @Query('page', new PageConverterPipe()) page?: number,
    @Query('limit', new LimitConverterPipe()) limit?: number,
    @Query('name') name?: string,
  ) {
    return this.categoryService.listCategories({
      page,
      limit,
      name,
    });
  }

  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiOkResponse({
    description: 'Category retrieved successfully',
    type: CategoryResponseDto,
  })
  @Get('/:id')
  getDetailCategory(@Param('id') id: string) {
    return this.categoryService.getDetailCategory(id);
  }

  @ApiOperation({ summary: 'Create a new category' })
  @Post('/')
  async createCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.createCategory(body);
  }

  @ApiOperation({ summary: 'Update a category' })
  @Patch('/:id')
  async updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, body);
  }

  @ApiOperation({ summary: 'Delete a category' })
  @Delete('/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}