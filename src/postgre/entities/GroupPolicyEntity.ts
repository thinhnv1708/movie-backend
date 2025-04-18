import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'group_policy' })
export class GroupPolicyEntity {
  @PrimaryColumn({ name: 'group_id' })
  groupId: string;

  @PrimaryColumn({ name: 'policy_id' })
  policyId: string;
}