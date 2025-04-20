import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class LockRepository {
  private readonly lockKeyPrefix = 'lock:';

  constructor(@InjectRedis() private redis: Redis) {}

  async getAndSetLockIfNotExists(
    key: string,
    lockTtl: number,
  ): Promise<boolean> {
    const lockKey = this.lockKeyPrefix + key;
    const lockValue = 1;
    const result = await this.redis.set(
      lockKey,
      lockValue,
      'EX',
      lockTtl,
      'NX',
    );
    const okResult = 'OK';

    return result === okResult;
  }

  async deleteLock(key: string): Promise<void> {
    const lockKey = this.lockKeyPrefix + key;
    await this.redis.del(lockKey);
  }

  async setLockTtl(key: string, lockTtl: number): Promise<void> {
    const lockKey = this.lockKeyPrefix + key;
    await this.redis.expire(lockKey, lockTtl);
  }
}
