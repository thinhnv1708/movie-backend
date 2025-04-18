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
exports.CreatePolicyResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const ApiDocumentResponse_1 = require("../../../../lib/ApiDocumentResponse");
class CreatePolicyData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the created policy',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], CreatePolicyData.prototype, "id", void 0);
class CreatePolicyResponseDto extends ApiDocumentResponse_1.ApiDocumentResponse {
}
exports.CreatePolicyResponseDto = CreatePolicyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreatePolicyData }),
    __metadata("design:type", CreatePolicyData)
], CreatePolicyResponseDto.prototype, "data", void 0);
//# sourceMappingURL=CreatePolicyResponseDto.js.map