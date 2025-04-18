import { MigrationInterface, QueryRunner } from 'typeorm';
import getTimestampSeconds from '../../src//lib/utils/getTimestampSeconds';
export class SeedRootUser1744789712978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rootUser = {
      id: 'root',
      email: process.env.ROOT_USER_EMAIL,
      password: process.env.ROOT_USER_PASSWORD,
      isRoot: true,
      activated: true,
      createdAt: getTimestampSeconds(),
    };

    await queryRunner.query(
      `INSERT INTO "user" (id, email, password, is_root, activated, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        rootUser.id,
        rootUser.email,
        rootUser.password,
        rootUser.isRoot,
        rootUser.activated,
        rootUser.createdAt,
        rootUser.createdAt,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user" WHERE id = 'root'`);
  }
}
