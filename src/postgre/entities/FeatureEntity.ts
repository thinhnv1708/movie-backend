import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { PolicyEntity } from './PolicyEntity';

@Entity({ name: 'feature' })
export class FeatureEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'parent_id' })
  parentId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  method: string;

  @Column({ name: 'created_at', nullable: true })
  createdAt: number;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: number;

  @ManyToMany(() => PolicyEntity, (policy) => policy.actions)
  policies: PolicyEntity[];
}
