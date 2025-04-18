"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const AppController_1 = require("./AppController");
const AppService_1 = require("./AppService");
const ActionModule_1 = require("./iam/action/ActionModule");
const AuthModule_1 = require("./iam/auth/AuthModule");
const GroupModule_1 = require("./iam/group/GroupModule");
const PolicyModule_1 = require("./iam/policy/PolicyModule");
const UserModule_1 = require("./iam/user/UserModule");
const ValidationPipe_1 = require("./lib/pipes/ValidationPipe");
const scanFolderSync_1 = require("./lib/utils/scanFolderSync");
const PostgreModule_1 = require("./postgre/PostgreModule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    async () => {
                        const configFactories = (0, scanFolderSync_1.default)(`${__dirname}/config`);
                        return configFactories.reduce((config, configFactory) => {
                            return {
                                ...config,
                                ...configFactory(),
                            };
                        }, {});
                    },
                ],
            }),
            PostgreModule_1.PostgreeModule,
            ioredis_1.RedisModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const redisConfig = configService.get('redis');
                    return {
                        type: 'single',
                        url: redisConfig.url,
                    };
                },
            }),
            // iam
            AuthModule_1.AuthModule,
            ActionModule_1.ActionModule,
            UserModule_1.UserModule,
            PolicyModule_1.PolicyModule,
            GroupModule_1.GroupModule,
        ],
        controllers: [AppController_1.AppController],
        providers: [
            {
                provide: core_1.APP_PIPE,
                useClass: ValidationPipe_1.ValidationPipe,
            },
            AppService_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=AppModule.js.map