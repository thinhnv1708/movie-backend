import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_group' })
export class UserGroupEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'group_id' })
  groupId: string;
}