import { Injectable } from '@nestjs/common';
import { IIatRepository } from './IIatRepository';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class IatRepository implements IIatRepository {
  private readonly iatPrefix = 'iat:';
  constructor(@InjectRedis() private redis: Redis) {}

  async getIat(userId: string): Promise<number> {
    const iat = await this.redis.get(`${this.iatPrefix}${userId}`);

    if (!iat) {
      return 0;
    }

    return Number(iat);
  }

  async setIat(userId: string, iat: number, expiresIn: number): Promise<void> {
    await this.redis.set(`${this.iatPrefix}${userId}`, iat, 'EX', expiresIn);
  }
}
