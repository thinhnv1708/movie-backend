import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ISendMessageCooldownRepository } from './ISendMessageCooldownRepository';

@Injectable()
export class SendMessageCooldownRepository
  implements ISendMessageCooldownRepository
{
  private readonly cooldownAtPrefixKey = 'userSendMessageCooldownAt:';
  constructor(@InjectRedis() private redis: Redis) {}

  async getCooldownAt(userId: string): Promise<number> {
    const cooldownAt = await this.redis.get(
      `${this.cooldownAtPrefixKey}${userId}`,
    );

    if (!cooldownAt) {
      return 0;
    }

    return Number(cooldownAt);
  }

  async setCooldownAt(
    userId: string,
    cooldownAt: number,
    expiresIn: number,
  ): Promise<void> {
    await this.redis.set(
      `${this.cooldownAtPrefixKey}${userId}`,
      cooldownAt,
      'EX',
      expiresIn,
    );
  }
}
