import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { GroupEntity } from './GroupEntity';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'is_root' })
  isRoot: boolean;

  @Column()
  activated: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'last_access' })
  lastAccess: number;

  @Column({ name: 'created_at' })
  createdAt: number;

  @Column({ name: 'updated_at' })
  updatedAt: number;

  @ManyToMany(() => GroupEntity, (group) => group.users)
  @JoinTable({
    name: 'user_group',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  groups: GroupEntity[];
}
