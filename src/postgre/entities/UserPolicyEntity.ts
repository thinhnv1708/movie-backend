import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_policy' })
export class UserPolicyEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'policy_id' })
  policyId: string;
}