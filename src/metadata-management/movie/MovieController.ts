import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticationGuard } from '../../guards/AuthenticationGuard';
import { AuthorizationGuard } from '../../guards/AuthorizationGuard';
import { ResponseDataInterceptor } from '../../interceptors/ResponseDataInterceptor';
import { MovieService } from './MovieService';
import { CreateMovieDto } from './dto/CreateMovieDto';
import { UpdateMovieDto } from './dto/UpdateMovieDto';
import { MovieResponseDto } from './dto/response/MovieResponseDto';
import { MoviesResponseDto } from './dto/response/MoviesResponseDto';

@ApiTags('Movie Metadata management')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@UseInterceptors(ResponseDataInterceptor)
@Controller('/mm/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiResponse({
    status: 201,
    description: 'The movie has been created successfully',
    type: MovieResponseDto,
  })
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.createMovie(createMovieDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a movie' })
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiResponse({
    status: 200,
    description: 'The movie has been deleted successfully',
  })
  async deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the movie with the specified ID',
    type: MovieResponseDto,
  })
  async getMovieById(@Param('id') id: string) {
    return this.movieService.getMovieById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Return movies',
    type: MoviesResponseDto,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: 'Filter movies by active status',
    type: Boolean,
  })
  @ApiQuery({
    name: 'isSingle',
    required: false,
    description:
      'Filter by movie type: true for single movies, false for series',
    type: Boolean,
  })
  @ApiQuery({
    name: 'countryId',
    required: false,
    description: 'Filter movies by country ID',
    type: String,
  })
  async getMovies(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('isActive') isActive?: boolean,
    @Query('isSingle') isSingle?: boolean,
    @Query('countryId') countryId?: string,
  ) {
    return this.movieService.getMovies({
      page,
      limit,
      isActive,
      isSingle,
      countryId,
    });
  }
}
