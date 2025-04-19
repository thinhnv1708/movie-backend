import { Injectable } from '@nestjs/common';
import { ISender } from './ISender';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import IGmailConfig from '../config/interfaces/IGmailConfig';
import Mail = require('nodemailer/lib/mailer');
import BusinessError from '../lib/BusinessError';
import StatusCode from '../lib/StatusCode';

interface IInput {
  to: string;
  subject: string;
  body: string;
  attachments?: string[];
  cc?: string[];
  bcc?: string[];
  html?: boolean;
  text?: boolean;
}

@Injectable()
export class GmailSender implements ISender<IInput> {
  private transporter: nodemailer.Transporter;
  private gmailConfig: IGmailConfig;

  constructor(private configService: ConfigService) {
    this.gmailConfig = this.configService.get<IGmailConfig>('gmail');

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.gmailConfig.gmail,
        pass: this.gmailConfig.appPassword,
      },
    });
  }

  async sendMessage(data: IInput): Promise<{ message: string }> {
    try {
      const mailOptions: Mail.Options = {
        from: `"noreply" <${this.gmailConfig.gmail}>`,
        to: data.to,
        subject: data.subject,
        text: data.text ? data.body : undefined,
        html: data.html ? data.body : undefined,
        cc: data.cc,
        bcc: data.bcc,
        attachments: data.attachments
          ? data.attachments.map((path) => ({ path }))
          : undefined,
      };

      if (!data.text && !data.html) {
        mailOptions.text = data.body;
      }

      await this.transporter.sendMail(mailOptions);

      return { message: `Email sent successfully` };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new BusinessError(StatusCode.SEND_EMAIL_FAILED);
    }
  }
}
