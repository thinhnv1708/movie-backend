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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const AppService_1 = require("./AppService");
const ApiDocumentResponse_1 = require("./lib/ApiDocumentResponse");
const ResponseDataInterceptor_1 = require("./lib/interceptors/ResponseDataInterceptor");
class HealthResponseDto extends ApiDocumentResponse_1.ApiDocumentResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "I/'m good!",
    }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "data", void 0);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    health() {
        return this.appService.health();
    }
};
exports.AppController = AppController;
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: HealthResponseDto,
    }),
    (0, common_1.Get)('/health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "health", null);
exports.AppController = AppController = __decorate([
    (0, common_1.UseInterceptors)(ResponseDataInterceptor_1.ResponseDataInterceptor),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [AppService_1.AppService])
], AppController);
//# sourceMappingURL=AppController.js.map