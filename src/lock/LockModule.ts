import { Module } from '@nestjs/common';
import { LockRepository } from './LockRepository';
import { LockService } from './LockService';

@Module({
  providers: [LockRepository, LockService],
  exports: [LockService],
})
export class LockModule {}
