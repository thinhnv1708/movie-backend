import { DataSource } from 'typeorm';
import 'dotenv/config';

export default new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  migrations: ['db/migrations/*.ts'],
  migrationsTableName: 'migration_logs',
});
