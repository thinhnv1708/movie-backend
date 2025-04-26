import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigFactory, ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './AppController';
import { AppService } from './AppService';
import IRedisConfig from './config/interfaces/IRedisConfig';
import { IAMModule } from './iam/IAMModule';
import { ValidationPipe } from './lib/pipes/ValidationPipe';
import scanFolderSync from './lib/utils/scanFolderSync';
import { MetadataManagementModule } from './metadata-management/MetadataManagementModule';
import { PostgreeModule } from './postgre/PostgreModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        async () => {
          const configFactories = scanFolderSync<ConfigFactory>(
            `${__dirname}/config`,
          );

          return configFactories.reduce((config, configFactory) => {
            return {
              ...config,
              ...configFactory(),
            };
          }, {});
        },
      ],
    }),
    PostgreeModule,
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisConfig = configService.get<IRedisConfig>('redis');

        return {
          type: 'single',
          url: redisConfig.url,
        };
      },
    }),
    IAMModule,
    MetadataManagementModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}
