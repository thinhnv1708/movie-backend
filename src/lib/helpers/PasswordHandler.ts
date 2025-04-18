import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PasswordHandler {
  hash(password: string, secret: string): string {
    const hash = crypto.createHmac('sha256', secret);
    hash.update(password);
    return hash.digest('hex');
  }

  verify(password: string, hashedPassword: string, secret: string): boolean {
    const hash = this.hash(password, secret);
    return hash === hashedPassword;
  }
}
