"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const AuthenticationGuard_1 = require("../../guards/AuthenticationGuard");
const AuthorizationGuard_1 = require("../../guards/AuthorizationGuard");
const ResponseDataInterceptor_1 = require("../../lib/interceptors/ResponseDataInterceptor");
const ActionService_1 = require("./ActionService");
const ActionsResponseDto_1 = require("./dto/ActionsResponseDto");
let ActionController = class ActionController {
    constructor(actionService) {
        this.actionService = actionService;
    }
    async getActions() {
        return this.actionService.getActions();
    }
};
exports.ActionController = ActionController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get all features with their actions',
        description: 'Retrieves a hierarchical list of all features in the system and their associated actions for IAM purposes',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all features with their associated actions',
        type: ActionsResponseDto_1.ActionsResponseDto,
    }),
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "getActions", null);
exports.ActionController = ActionController = __decorate([
    (0, swagger_1.ApiTags)('Actions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(AuthenticationGuard_1.AuthenticationGuard, AuthorizationGuard_1.AuthorizationGuard),
    (0, common_1.UseInterceptors)(ResponseDataInterceptor_1.ResponseDataInterceptor),
    (0, common_1.Controller)('/iam/action'),
    __metadata("design:paramtypes", [ActionService_1.ActionService])
], ActionController);
//# sourceMappingURL=ActionController.js.map