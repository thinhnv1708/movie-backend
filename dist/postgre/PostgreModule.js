"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreeModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const scanFolderSync_1 = require("../lib/utils/scanFolderSync");
const path = require("path");
const entities = (0, scanFolderSync_1.default)(path.resolve(__dirname, 'entities'));
let PostgreeModule = class PostgreeModule {
};
exports.PostgreeModule = PostgreeModule;
exports.PostgreeModule = PostgreeModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                inject: [config_1.ConfigService],
                provide: 'DATA_SOURCE',
                useFactory: async (configService) => {
                    const postgreConfig = configService.get('postgre');
                    const dataSource = new typeorm_1.DataSource({
                        type: 'postgres',
                        url: postgreConfig.url,
                        entities,
                        synchronize: false,
                    });
                    return dataSource.initialize();
                },
            },
            ...entities.map((entity) => ({
                provide: entity,
                useFactory: (dataSource) => dataSource.getRepository(entity),
                inject: ['DATA_SOURCE'],
            })),
        ],
        exports: ['DATA_SOURCE', ...entities],
    })
], PostgreeModule);
//# sourceMappingURL=PostgreModule.js.map