import { Module } from '@nestjs/common';
import { CountryController } from './CountryController';
import { CountryService } from './CountryService';
import { CountryRepository } from './CountryRepository';

@Module({
  controllers: [CountryController],
  providers: [
    {
      provide: 'CountryRepo',
      useClass: CountryRepository,
    },
    CountryService,
  ],
  exports: ['CountryRepo', CountryService],
})
export class CountryModule {}