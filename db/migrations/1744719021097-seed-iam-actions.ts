import { MigrationInterface, QueryRunner } from 'typeorm';

const data = [
  {
    id: 'iam',
    name: 'Identity and Access Management',
    description: 'Manage users, roles, and permissions',
    actions: [
      {
        id: 'iam:fullAccess',
        name: 'Full IAM access',
        description: 'Full access to IAM features',
        method: '*',
        path: '/iam/*',
      },
    ],
    children: [
      {
        id: 'iam:user',
        name: 'User Management',
        description: 'Manage users in the system',
        actions: [
          {
            id: 'iam:user:fullAccess',
            name: 'Full user access',
            description: 'Full access to all user management features',
            method: '*',
            path: '/iam/user/*',
          },
          {
            id: 'iam:user:create',
            name: 'Create user',
            description: 'Create a new user in the system',
            method: 'POST',
            path: '/iam/user',
          },
        ],
      },
      {
        id: 'iam:group',
        name: 'Group Management',
        description: 'Manage user groups in the system',
        actions: [
          {
            id: 'iam:group:fullAccess',
            name: 'Full group access',
            description: 'Full access to all group management features',
            method: '*',
            path: '/iam/group/*',
          },
          {
            id: 'iam:group:list',
            name: 'List groups',
            description: 'Get a list of all groups',
            method: 'GET',
            path: '/iam/group',
          },
          {
            id: 'iam:group:detail',
            name: 'Get group details',
            description: 'Get detailed information about a specific group',
            method: 'GET',
            path: '/iam/group/:id',
          },
          {
            id: 'iam:group:create',
            name: 'Create group',
            description: 'Create a new group',
            method: 'POST',
            path: '/iam/group',
          },
          {
            id: 'iam:group:update',
            name: 'Update group',
            description: 'Update an existing group',
            method: 'PATCH',
            path: '/iam/group/:id',
          },
          {
            id: 'iam:group:delete',
            name: 'Delete group',
            description: 'Delete a group from the system',
            method: 'DELETE',
            path: '/iam/group/:id',
          },
        ],
      },
      {
        id: 'iam:policy',
        name: 'Policy Management',
        description: 'Manage access policies in the system',
        actions: [
          {
            id: 'iam:policy:fullAccess',
            name: 'Full policy access',
            description: 'Full access to all policy management features',
            method: '*',
            path: '/iam/policy/*',
          },
          {
            id: 'iam:policy:list',
            name: 'List policies',
            description: 'Get a list of all policies',
            method: 'GET',
            path: '/iam/policy',
          },
          {
            id: 'iam:policy:detail',
            name: 'Get policy details',
            description: 'Get detailed information about a specific policy',
            method: 'GET',
            path: '/iam/policy/:id',
          },
          {
            id: 'iam:policy:create',
            name: 'Create policy',
            description: 'Create a new policy',
            method: 'POST',
            path: '/iam/policy',
          },
          {
            id: 'iam:policy:update',
            name: 'Update policy',
            description: 'Update an existing policy',
            method: 'PATCH',
            path: '/iam/policy/:id',
          },
          {
            id: 'iam:policy:delete',
            name: 'Delete policy',
            description: 'Delete a policy from the system',
            method: 'DELETE',
            path: '/iam/policy/:id',
          },
        ],
      },
      {
        id: 'iam:action',
        name: 'Action Management',
        description: 'Manage system actions and permissions',
        actions: [
          {
            id: 'iam:action:fullAccess',
            name: 'Full action access',
            description: 'Full access to all action management features',
            method: '*',
            path: '/iam/action/*',
          },
          {
            id: 'iam:action:list',
            name: 'List actions',
            description: 'Get a list of all features and their actions',
            method: 'GET',
            path: '/iam/action',
          },
        ],
      },
    ],
  },
];

const defaultPolicies = [
  {
    id: 'iamFullAccess',
    name: 'IAM Full Access',
    description: 'Provides full access to all IAM features and functions',
    actions: ['iam:fullAccess'],
    isDefault: true,
  },
];

export class SeedActions1744719021097 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const timestamp = Math.floor(Date.now() / 1000);

    // Insert features
    for (const feature of data) {
      await queryRunner.query(
        `INSERT INTO "feature" (id, parent_id, name, description, created_at, updated_at) 
         VALUES ($1, NULL, $2, $3, $4, $5)`,
        [feature.id, feature.name, feature.description, timestamp, timestamp],
      );

      // Insert root level actions
      for (const action of feature.actions) {
        await queryRunner.query(
          `INSERT INTO "action" (id, feature_id, name, description, path, method, created_at, updated_at) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            action.id,
            feature.id,
            action.name,
            action.description,
            action.path,
            action.method,
            timestamp,
            timestamp,
          ],
        );
      }

      // Insert child features and their actions
      for (const child of feature.children) {
        await queryRunner.query(
          `INSERT INTO "feature" (id, parent_id, name, description, created_at, updated_at) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            child.id,
            feature.id,
            child.name,
            child.description,
            timestamp,
            timestamp,
          ],
        );

        for (const action of child.actions) {
          await queryRunner.query(
            `INSERT INTO "action" (id, feature_id, name, description, path, method, created_at, updated_at) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
              action.id,
              child.id,
              action.name,
              action.description,
              action.path,
              action.method,
              timestamp,
              timestamp,
            ],
          );
        }
      }
    }

    // Insert default policies
    for (const policy of defaultPolicies) {
      // Insert the policy with isDefault = true
      await queryRunner.query(
        `INSERT INTO "policy" (id, name, description, is_default, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          policy.id,
          policy.name,
          policy.description,
          policy.isDefault,
          timestamp,
          timestamp,
        ],
      );

      // Connect policy with actions in policy_action table
      for (const actionId of policy.actions) {
        await queryRunner.query(
          `INSERT INTO "policy_action" (policy_id, action_id) 
           VALUES ($1, $2)`,
          [policy.id, actionId],
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete policy actions first
    for (const policy of defaultPolicies) {
      await queryRunner.query(
        `DELETE FROM "policy_action" WHERE policy_id = $1`,
        [policy.id],
      );
    }

    // Delete policies
    await queryRunner.query(
      `DELETE FROM "policy" WHERE id IN (${defaultPolicies.map((_, i) => `$${i + 1}`).join(',')})`,
      defaultPolicies.map((policy) => policy.id),
    );

    // Delete actions first due to foreign key constraints
    await queryRunner.query(`DELETE FROM "action" WHERE id LIKE 'iam%'`);

    // Then delete features
    await queryRunner.query(`DELETE FROM "feature" WHERE id LIKE 'iam%'`);
  }
}
