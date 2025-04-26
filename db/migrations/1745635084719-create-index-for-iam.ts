import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIndexForIam1745635084719 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX "IDX_iam_user_id" ON "iam" ("user_id");
            CREATE INDEX "IDX_iam_role_id" ON "iam" ("role_id");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
