import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../postgre/entities/UserEntity';
import { IPersonalizedRepository } from './IPersonalizedRepository';
import getTimestampSeconds from '../../lib/utils/getTimestampSeconds';

@Injectable()
export class PersonalizedRepository implements IPersonalizedRepository {
  constructor(
    @Inject(UserEntity)
    private userModel: Repository<UserEntity>,
  ) {}

  async getUserById(id: string): Promise<{
    id: string;
    activated: boolean;
    email: string;
    password: string;
  }> {
    return this.userModel.findOne({
      where: { id },
      select: {
        id: true,
        activated: true,
        email: true,
        password: true,
      },
    });
  }

  async updateUserPassword(
    userId: string,
    newPassword: string,
    updatedAt: number,
  ): Promise<void> {
    await this.userModel.update(userId, {
      password: newPassword,
      updatedAt,
    });
  }

  async getUserInfo(userId: string): Promise<{
    id: string;
    email: string;
    isRoot: boolean;
    activated: boolean;
    lastAccess: number;
    createdAt: number;
    updatedAt: number;
  }> {
    return this.userModel.findOne({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        isRoot: true,
        activated: true,
        lastAccess: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
