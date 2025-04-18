import { Injectable } from '@nestjs/common';

@Injectable()
export class SendMessageService {
  async send(data: any): Promise<{ message: string }> {
    // Logic to send a message
    console.log('Message sent:', data);

    return { message: 'Message sent successfully' };
  }
}
