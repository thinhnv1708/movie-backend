import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import IPostgreConfig from '../config/interfaces/IPostgreConfig';
import scanFolderSync from '../lib/utils/scanFolderSync';
import * as path from 'path';
const entities = scanFolderSync(path.resolve(__dirname, 'entities'));

@Global()
@Module({
  providers: [
    {
      inject: [ConfigService],
      provide: 'DATA_SOURCE',
      useFactory: async (configService: ConfigService) => {
        const postgreConfig = configService.get<IPostgreConfig>('postgre');

        const dataSource = new DataSource({
          type: 'postgres',
          url: postgreConfig.url,
          entities,
          synchronize: false,
        });

        return dataSource.initialize();
      },
    },
    ...entities.map<Provider>((entity) => ({
      provide: entity,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
      inject: ['DATA_SOURCE'],
    })),
  ],
  exports: ['DATA_SOURCE', ...entities],
})
export class PostgreeModule {}
