import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { PolicyEntity } from './PolicyEntity';
import { FeatureEntity } from './FeatureEntity';

@Entity({ name: 'action' })
export class ActionEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'feature_id' })
  featureId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  path: string;

  @Column()
  method: string;

  @Column({ name: 'created_at', nullable: true })
  createdAt: number;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: number;

  @ManyToMany(() => PolicyEntity, (policy) => policy.actions)
  policies: PolicyEntity[];

  @ManyToOne(() => FeatureEntity)
  @JoinColumn({ name: 'feature_id' })
  feature: FeatureEntity;
}
