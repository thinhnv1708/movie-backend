import { readFileSync } from 'fs';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMovieTables1745656771109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sql = await readFileSync('db/sql/init-movie-tables.up.sql', 'utf8');

    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const sql = await readFileSync('db/sql/init-movie-tables.down.sql', 'utf8');

    await queryRunner.query(sql);
  }
}
