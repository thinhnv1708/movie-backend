import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity({ name: 'group' })
export class GroupEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'created_at', nullable: true })
  createdAt: number;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: number;

  @ManyToMany(() => UserEntity, (user) => user.groups)
  users: UserEntity[];
}
