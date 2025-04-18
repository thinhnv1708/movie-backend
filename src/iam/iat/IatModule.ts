import { Module } from '@nestjs/common';
import { IatRepository } from './IatRepository';

@Module({
  providers: [
    {
      provide: 'IatRepo',
      useClass: IatRepository,
    },
  ],
  exports: ['IatRepo'],
})
export class IatModule {}
