import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'policy_action' })
export class PolicyActionEntity {
  @PrimaryColumn({ name: 'policy_id' })
  policyId: string;

  @PrimaryColumn({ name: 'action_id' })
  actionId: string;
}
