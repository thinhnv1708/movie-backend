import { Module } from '@nestjs/common';
import { SendMessageService } from './SendMessageService';
import { GmailSender } from './GmailSender';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [SendMessageService, GmailSender],
  exports: [SendMessageService],
})
export class SendMessageModule {}
