"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const AppModule_1 = require("./AppModule");
const config_1 = require("@nestjs/config");
const HttpExeptionFilter_1 = require("./exception-filters/HttpExeptionFilter");
const swagger_1 = require("@nestjs/swagger");
const UncatchExeptionFilter_1 = require("./exception-filters/UncatchExeptionFilter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(AppModule_1.AppModule);
    app.setGlobalPrefix('/api');
    const configService = app.get(config_1.ConfigService);
    const appConfig = configService.get('app');
    // filters scan right to left
    app.useGlobalFilters(new UncatchExeptionFilter_1.UncatchExeptionFilter(), new HttpExeptionFilter_1.HttpExceptionFilter());
    const documentConfig = new swagger_1.DocumentBuilder()
        .setTitle('Movie API')
        .addBearerAuth()
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, documentConfig);
    swagger_1.SwaggerModule.setup('document', app, documentFactory);
    await app.listen(appConfig.port);
}
bootstrap();
//# sourceMappingURL=main.js.map