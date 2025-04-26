import { Module } from '@nestjs/common';
import { CountryModule } from './country/CountryModule';
import { CategoryModule } from './category/CategoryModule';
import { MovieModule } from './movie/MovieModule';
import { EpisodeModule } from './episode/EpisodeModule';

@Module({
  imports: [CountryModule, CategoryModule, MovieModule, EpisodeModule],
})
export class MetadataManagementModule {}
