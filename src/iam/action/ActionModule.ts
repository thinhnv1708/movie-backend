import { Module } from '@nestjs/common';
import { ActionController } from './ActionController';
import { ActionService } from './ActionService';
import { ActionRepository } from './ActionRepository';

@Module({
  controllers: [ActionController],
  providers: [
    {
      provide: 'ActionRepo',
      useClass: ActionRepository,
    },
    ActionService,
  ],
  exports: ['ActionRepo', ActionService],
})
export class ActionModule {}
