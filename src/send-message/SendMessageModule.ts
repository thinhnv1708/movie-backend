import { Module } from '@nestjs/common';
import { SendMessageService } from './SendMessageService';

@Module({
  providers: [SendMessageService],
  exports: [SendMessageService],
})
export class SendMessageModule {}
