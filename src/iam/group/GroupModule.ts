import { Module } from '@nestjs/common';
import { GroupController } from './GroupController';
import { GroupService } from './GroupService';
import { GroupRepository } from './GroupRepository';

@Module({
  controllers: [GroupController],
  providers: [
    {
      provide: 'GroupRepo',
      useClass: GroupRepository,
    },
    GroupService,
  ],
})
export class GroupModule {}