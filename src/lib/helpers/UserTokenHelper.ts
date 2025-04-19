import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class UserTokenHelper {
  hashToken(token: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(token);
    return hash.digest('hex');
  }
}
