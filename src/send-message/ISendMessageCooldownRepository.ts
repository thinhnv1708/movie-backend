export interface ISendMessageCooldownRepository {
  getCooldownAt(userId: string): Promise<number>;
  setCooldownAt(
    userId: string,
    cooldownAt: number,
    expiresIn: number,
  ): Promise<void>;
}
