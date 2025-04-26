import { Injectable } from '@nestjs/common';
import { delay } from '../lib/utils/delay';
import { LockRepository } from './LockRepository';

@Injectable()
export class LockService {
  private readonly defaultLockTTL = 10; // seconds
  private lockCheckAgainPeriod = 50; // ms
  private lockTtlExtendsStore: Map<string, NodeJS.Timeout> = new Map();
  constructor(private readonly lockRepo: LockRepository) {}

  async acquireLock(
    key: string,
    options?: {
      lockTtl?: number;
      lockTtlExtendsEnabled?: boolean;
      lockWaitEnabled?: boolean;
    },
  ): Promise<boolean> {
    const {
      lockTtl,
      lockTtlExtendsEnabled = false,
      lockWaitEnabled = false,
    } = options || {};
    const newLockTtl = lockTtl || this.defaultLockTTL;

    const successAcquireLock = await this.lockRepo.getAndSetLockIfNotExists(
      key,
      newLockTtl,
    );

    if (!successAcquireLock && !lockWaitEnabled) {
      return false;
    }

    if (!successAcquireLock && lockWaitEnabled) {
      await delay(this.lockCheckAgainPeriod);
      return this.acquireLock(key, options);
    }

    if (lockTtlExtendsEnabled) {
      const intervalId = this.extendsLockTtl(key, newLockTtl);
      this.lockTtlExtendsStore.set(key, intervalId);
    }

    return true;
  }

  async releaseLock(key: string): Promise<void> {
    const intervalId = this.lockTtlExtendsStore.get(key);

    if (intervalId) {
      clearInterval(intervalId);
      this.lockTtlExtendsStore.delete(key);
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
