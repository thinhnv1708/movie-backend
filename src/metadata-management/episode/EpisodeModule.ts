import { Module } from '@nestjs/common';
import { EpisodeController } from './EpisodeController';
import { EpisodeRepository } from './EpisodeRepository';
import { EpisodeService } from './EpisodeService';

@Module({
  imports: [],
  controllers: [EpisodeController],
  providers: [
    EpisodeService,
    {
      provide: 'EpisodeRepo',
      useClass: EpisodeRepository,
    },
  ],
  exports: [EpisodeService],
})
export class EpisodeModule {}
