import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { ActionEntity } from './ActionEntity';

@Entity({ name: 'policy' })
export class PolicyEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'is_default' })
  isDefault: boolean;

  @ManyToMany(() => ActionEntity, (action) => action.policies)
  @JoinTable({
    name: 'policy_action',
    joinColumn: {
      name: 'policy_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'action_id',
      referencedColumnName: 'id',
    },
  })
  actions: ActionEntity[];

  @Column({ name: 'created_at', nullable: true })
  createdAt: number;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: number;
}
