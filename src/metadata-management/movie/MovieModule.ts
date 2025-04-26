import { Module } from '@nestjs/common';
import { MovieController } from './MovieController';
import { MovieService } from './MovieService';
import { MovieRepository } from './MovieRepository';

@Module({
  controllers: [MovieController],
  providers: [
    {
      provide: 'MovieRepo',
      useClass: MovieRepository,
    },
    MovieService,
  ],
  exports: ['MovieRepo', MovieService],
})
export class MovieModule {}