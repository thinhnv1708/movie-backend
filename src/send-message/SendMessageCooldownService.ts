import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ISendMessageConfig from '../config/interfaces/ISendMessageConfig';
import getTimestampSeconds from '../lib/utils/getTimestampSeconds';
import { SendMessageCooldownRepository } from './SendMessageCooldownRepository';
import BusinessError from '../lib/BusinessError';
import StatusCode from '../lib/StatusCode';

@Injectable()
export class SendMessageCooldownService {
  constructor(
    private configService: ConfigService,
    @Inject('SendMessageCooldownRepo')
    private sendMessageCooldownRepo: SendMessageCooldownRepository,
  ) {}

  private getCooldownAt(userId: string) {
    return this.sendMessageCooldownRepo.getCooldownAt(userId);
  }

  async setCooldownAt(userId: string) {
    const sendMessageConfig =
      this.configService.get<ISendMessageConfig>('sendMessage');

    const cooldownAt = getTimestampSeconds() + sendMessageConfig.cooldown;

    await this.sendMessageCooldownRepo.setCooldownAt(
      userId,
      cooldownAt,
      sendMessageConfig.cooldown,
    );
  }

  async checkCooldown(userId: string) {
    const cooldownAt = await this.getCooldownAt(userId);

    const now = getTimestampSeconds();

    if (now < cooldownAt) {
      throw new BusinessError(StatusCode.USER_NO_COOLDOWN_YET, {
        args: {
        cooldownRemainder: cooldownAt - now,
        },
      });
    }
  }
}
