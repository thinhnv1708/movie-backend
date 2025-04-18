import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { ConfigService } from '@nestjs/config';
import IAppConfig from './config/interfaces/IAppConfig';
import { HttpExceptionFilter } from './exception-filters/HttpExeptionFilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UncatchExeptionFilter } from './exception-filters/UncatchExeptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const configService = app.get(ConfigService);

  const appConfig = configService.get<IAppConfig>('app');

  // filters scan right to left
  app.useGlobalFilters(new UncatchExeptionFilter(), new HttpExceptionFilter());

  if (appConfig.deploymentEnv !== 'production') {
    const documentConfig = new DocumentBuilder()
      .setTitle('Movie API')
      .addBearerAuth()
      .build();
    const documentFactory = () =>
      SwaggerModule.createDocument(app, documentConfig);

    SwaggerModule.setup('document', app, documentFactory);
  }

  await app.listen(appConfig.port);
}
bootstrap();
