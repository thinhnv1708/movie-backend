import { Injectable } from '@nestjs/common';
import { GmailSender } from './GmailSender';

@Injectable()
export class SendMessageService {
  constructor(private gmailSender: GmailSender) {}

  async sendMessage(data: {
    to: string;
    subject: string;
    content: string;
  }): Promise<{ message: string }> {
    const { to, subject, content } = data;
    return this.gmailSender.sendMessage({
      to,
      subject,
      body: content,
      html: true,
    });
  }
}
