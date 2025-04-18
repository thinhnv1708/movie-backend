import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity({ name: 'user_token' })
export class UserTokenEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  token: string;

  @Column({ name: 'created_at' })
  createdAt: number;

  @Column({ name: 'expires_at' })
  expiresAt: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
