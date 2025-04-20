import { Injectable } from '@nestjs/common';
import { delay } from '../lib/utils/delay';
import { LockRepository } from './LockRepository';

@Injectable()
export class LockService {
  private readonly defaultLockTTL = 10; // seconds
  private checkLockAgainPeriod = 50; // ms
  private extendsLockIntervalId: Map<string, NodeJS.Timeout> = new Map();
  constructor(private readonly lockRepo: LockRepository) {}

  async acquireLock(
    key: string,
    options?: {
      lockTtl?: number;
      extendsLockTtl?: boolean;
      waitForLock?: boolean;
    },
  ): Promise<boolean> {
    const {
      lockTtl,
      extendsLockTtl = false,
      waitForLock = false,
    } = options || {};
    const newLockTtl = lockTtl || this.defaultLockTTL;

    const successAcquireLock = await this.lockRepo.getAndSetLockIfNotExists(
      key,
      newLockTtl,
    );

    if (!successAcquireLock && !waitForLock) {
      return false;
    }

    if (!successAcquireLock && waitForLock) {
      await delay(this.checkLockAgainPeriod);
      return this.acquireLock(key, options);
    }

    if (extendsLockTtl) {
      const intervalId = this.extendsLockTtl(key, newLockTtl);
      this.extendsLockIntervalId.set(key, intervalId);
    }

    return true;
  }

  async releaseLock(key: string): Promise<void> {
    const intervalId = this.extendsLockIntervalId.get(key);

    if (intervalId) {
      clearInterval(intervalId);
      this.extendsLockIntervalId.delete(key);
    }

    await this.lockRepo.deleteLock(key);
  }

  private extendsLockTtl(key: string, lockTtl: number): NodeJS.Timeout {
    const intervalTime = (lockTtl / 2) * 1000; // seconds to ms

    const intervalId = setInterval(
      this.lockRepo.setLockTtl.bind(this.lockRepo, key, lockTtl),
      intervalTime,
    );

    return intervalId;
  }
}
