import { Module } from '@nestjs/common';
import { SendMessageService } from './SendMessageService';
import { GmailSender } from './GmailSender';
import { ConfigModule } from '@nestjs/config';
import { SendMessageCooldownRepository } from './SendMessageCooldownRepository';
import { SendMessageCooldownService } from './SendMessageCooldownService';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SendMessageCooldownRepo',
      useClass: SendMessageCooldownRepository,
    },
    GmailSender,
    SendMessageService,
    SendMessageCooldownService,
  ],
  exports: [SendMessageService, SendMessageCooldownService],
})
export class SendMessageModule {}
