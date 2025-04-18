import { Module } from '@nestjs/common';
import { PolicyController } from './PolicyController';
import { PolicyService } from './PolicyService';
import { PolicyRepository } from './PolicyRepository';

@Module({
  controllers: [PolicyController],
  providers: [
    {
      provide: 'PolicyRepo',
      useClass: PolicyRepository,
    },
    PolicyService,
  ],
})
export class PolicyModule {}
