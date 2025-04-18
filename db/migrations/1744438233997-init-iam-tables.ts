import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFileSync } from 'fs';

export class InitIamTables1744438233997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sql = await readFileSync('db/sql/init-iam-tables.up.sql', 'utf8');

    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const sql = await readFileSync('db/sql/init-iam-tables.down.sql', 'utf8');

    await queryRunner.query(sql);
  }
}
