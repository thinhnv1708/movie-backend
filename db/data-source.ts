import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env',
});
export default new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  migrations: ['db/migrations/*.ts'],
  migrationsTableName: 'migration_logs',
});
