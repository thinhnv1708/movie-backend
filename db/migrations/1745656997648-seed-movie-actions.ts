import { MigrationInterface, QueryRunner } from 'typeorm';

const data = [
  {
    id: 'mm',
    name: 'Metadata Management',
    description:
      'Manage movie metadata, country metadata, category metadata and episode metadata',
    actions: [
      {
        id: 'mm:fullAccess',
        name: 'Full MM access',
        description: 'Full access to <MM> features',
        method: '*',
        path: '/mm/*',
      },
    ],
    children: [
      {
        id: 'mm:movie',
        name: 'Movie metadata management',
        description: 'Manage movie metadata in the system',
        actions: [
          {
            id: 'mm:movie:fullAccess',
            name: 'Full movie access',
            description: 'Full access to all movie management features',
            method: '*',
            path: '/mm/movie/*',
          },
          {
            id: 'mm:movie:list',
            name: 'List movies',
            description: 'Get a list of all movies with pagination',
            method: 'GET',
            path: '/mm/movie',
          },
          {
            id: 'mm:movie:detail',
            name: 'Get movie details',
            description: 'Get detailed information about a specific movie',
            method: 'GET',
            path: '/mm/movie/:id',
          },
          {
            id: 'mm:movie:create',
            name: 'Create movie',
            description: 'Create a new movie',
            method: 'POST',
            path: '/mm/movie',
          },
          {
            id: 'mm:movie:update',
            name: 'Update movie',
            description: 'Update an existing movie',
            method: 'PUT',
            path: '/mm/movie/:id',
          },
          {
            id: 'mm:movie:delete',
            name: 'Delete movie',
            description: 'Delete a movie from the system',
            method: 'DELETE',
            path: '/mm/movie/:id',
          },
        ],
      },
      {
        id: 'mm:category',
        name: 'Category Management',
        description: 'Manage movie categories in the system',
        actions: [
          {
            id: 'mm:category:fullAccess',
            name: 'Full category access',
            description: 'Full access to all category management features',
            method: '*',
            path: '/mm/category/*',
          },
          {
            id: 'mm:category:list',
            name: 'List categories',
            description: 'Get a list of all categories',
            method: 'GET',
            path: '/mm/category',
          },
          {
            id: 'mm:category:detail',
            name: 'Get category details',
            description: 'Get detailed information about a specific category',
            method: 'GET',
            path: '/mm/category/:id',
          },
          {
            id: 'mm:category:create',
            name: 'Create category',
            description: 'Create a new category',
            method: 'POST',
            path: '/mm/category',
          },
          {
            id: 'mm:category:update',
            name: 'Update category',
            description: 'Update an existing category',
            method: 'PATCH',
            path: '/mm/category/:id',
          },
          {
            id: 'mm:category:delete',
            name: 'Delete category',
            description: 'Delete a category from the system',
            method: 'DELETE',
            path: '/mm/category/:id',
          },
        ],
      },
      {
        id: 'mm:country',
        name: 'Country Management',
        description: 'Manage movie countries in the system',
        actions: [
          {
            id: 'mm:country:fullAccess',
            name: 'Full country access',
            description: 'Full access to all country management features',
            method: '*',
            path: '/mm/country/*',
          },
          {
            id: 'mm:country:list',
            name: 'List countries',
            description: 'Get a list of all countries',
            method: 'GET',
            path: '/mm/country',
          },
          {
            id: 'mm:country:detail',
            name: 'Get country details',
            description: 'Get detailed information about a specific country',
            method: 'GET',
            path: '/mm/country/:id',
          },
          {
            id: 'mm:country:create',
            name: 'Create country',
            description: 'Create a new country',
            method: 'POST',
            path: '/mm/country',
          },
          {
            id: 'mm:country:update',
            name: 'Update country',
            description: 'Update an existing country',
            method: 'PATCH',
            path: '/mm/country/:id',
          },
          {
            id: 'mm:country:delete',
            name: 'Delete country',
            description: 'Delete a country from the system',
            method: 'DELETE',
            path: '/mm/country/:id',
          },
        ],
      },
      {
        id: 'mm:episode',
        name: 'Episode Management',
        description: 'Manage movie episodes in the system',
        actions: [
          {
            id: 'mm:episode:fullAccess',
            name: 'Full episode access',
            description: 'Full access to all episode management features',
            method: '*',
            path: '/mm/episode/*',
          },
          {
            id: 'mm:episode:list',
            name: 'List episodes',
            description: 'Get a list of episodes by movie ID',
            method: 'GET',
            path: '/mm/episode',
          },
          {
            id: 'mm:episode:detail',
            name: 'Get episode details',
            description: 'Get detailed information about a specific episode',
            method: 'GET',
            path: '/mm/episode/:id',
          },
          {
            id: 'mm:episode:create',
            name: 'Create episode',
            description: 'Create a new episode',
            method: 'POST',
            path: '/mm/episode',
          },
          {
            id: 'mm:episode:update',
            name: 'Update episode',
            description: 'Update an existing episode',
            method: 'PUT',
            path: '/mm/episode/:id',
          },
          {
            id: 'mm:episode:delete',
            name: 'Delete episode',
            description: 'Delete an episode from the system',
            method: 'DELETE',
            path: '/mm/episode/:id',
          },
        ],
      },
    ],
  },
];

const defaultPolicies = [
  {
    id: 'mmFullAccess',
    name: 'MM Full Access',
    description: 'Provides full access to all Metadata Management features and functions',
    actions: ['mm:fullAccess'],
    isDefault: true,
  },
];

export class SeedMovieActions1745656997648 implements MigrationInterface {
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
    await queryRunner.query(`DELETE FROM "action" WHERE id LIKE 'mm%'`);

    // Then delete features
    await queryRunner.query(`DELETE FROM "feature" WHERE id LIKE 'mm%'`);
  }
}
