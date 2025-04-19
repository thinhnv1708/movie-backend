import { Module } from '@nestjs/common';
import { PasswordHandler } from '../../lib/helpers/PasswordHandler';
import { IatModule } from '../iat/IatModule';
import { PersonalizedController } from './PersonalizedController';
import { PersonalizedRepository } from './PersonalizedRepository';
import { PersonalizedService } from './PersonalizedService';

@Module({
  imports: [IatModule],
  controllers: [PersonalizedController],
  providers: [
    {
      provide: 'PersonalizedRepo',
      useClass: PersonalizedRepository,
    },
    PersonalizedService,
    PasswordHandler,
  ],
})
export class PersonalizedModule {}
