"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const UserController_1 = require("./UserController");
const UserRepository_1 = require("./UserRepository");
const UserService_1 = require("./UserService");
const SendMessageModule_1 = require("../../send-message/SendMessageModule");
const PasswordHandler_1 = require("../../lib/helpers/PasswordHandler");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [SendMessageModule_1.SendMessageModule],
        controllers: [UserController_1.UserController],
        providers: [
            {
                provide: 'UserRepo',
                useClass: UserRepository_1.UserRepository,
            },
            UserService_1.UserService,
            PasswordHandler_1.PasswordHandler,
        ],
    })
], UserModule);
//# sourceMappingURL=UserModule.js.map