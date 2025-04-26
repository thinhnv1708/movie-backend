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
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticationGuard } from '../../guards/AuthenticationGuard';
import { AuthorizationGuard } from '../../guards/AuthorizationGuard';
import { ResponseDataInterceptor } from '../../interceptors/ResponseDataInterceptor';
import { EpisodeService } from './EpisodeService';
import { CreateEpisodeDto } from './dto/CreateEpisodeDto';
import { UpdateEpisodeDto } from './dto/UpdateEpisodeDto';

@ApiTags('Episode Metadata management')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@UseInterceptors(ResponseDataInterceptor)
@Controller('/mm/episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new episode' })
  async createEpisode(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodeService.createEpisode(createEpisodeDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an episode by ID' })
  @ApiParam({ name: 'id', description: 'Episode ID' })
  async updateEpisode(
    @Param('id') id: string,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ) {
    return this.episodeService.updateEpisode(id, updateEpisodeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an episode by ID' })
  @ApiParam({ name: 'id', description: 'Episode ID' })
  async deleteEpisode(@Param('id') id: string) {
    return this.episodeService.deleteEpisode(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an episode by ID' })
  @ApiParam({ name: 'id', description: 'Episode ID' })
  async getEpisodeById(@Param('id') id: string) {
    return this.episodeService.getEpisodeById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get episodes by movie ID' })
  @ApiQuery({ name: 'movieId', description: 'Movie ID', required: true })
  @ApiQuery({
    name: 'order',
    description: 'Episode order',
    required: false,
    type: Number,
  })
  async getEpisodesByMovieId(
    @Query('movieId') movieId: string,
    @Query('order') order?: number,
  ) {
    return this.episodeService.getEpisodesByMovieId(movieId, order);
  }
}
