import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class UserTokenHelper {
  generateToken(): string {
    const token = crypto.randomBytes(32).toString('hex');
    return token;
  }

  hashToken(token: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(token);
    return hash.digest('hex');
  }
}
