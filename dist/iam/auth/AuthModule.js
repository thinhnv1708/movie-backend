"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const AuthController_1 = require("./AuthController");
const AuthService_1 = require("./AuthService");
const AuthRepository_1 = require("./AuthRepository");
const UserModule_1 = require("../user/UserModule");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const PasswordHandler_1 = require("../../lib/helpers/PasswordHandler");
const IatModule_1 = require("../iat/IatModule");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [UserModule_1.UserModule, jwt_1.JwtModule.register({}), config_1.ConfigModule, IatModule_1.IatModule],
        controllers: [AuthController_1.AuthController],
        providers: [
            {
                provide: 'AuthRepo',
                useClass: AuthRepository_1.AuthRepository,
            },
            AuthService_1.AuthService,
            PasswordHandler_1.PasswordHandler,
        ],
        exports: [AuthService_1.AuthService, 'AuthRepo'],
    })
], AuthModule);
//# sourceMappingURL=AuthModule.js.map