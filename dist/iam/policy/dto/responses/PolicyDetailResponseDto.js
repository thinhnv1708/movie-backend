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
exports.PolicyDetailResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const PolicyDto_1 = require("./PolicyDto");
const ApiDocumentResponse_1 = require("../../../../lib/ApiDocumentResponse");
class Action {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the action',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], Action.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the action',
        example: 'ReadUserProfile',
    }),
    __metadata("design:type", String)
], Action.prototype, "name", void 0);
class PolicyDetailData extends PolicyDto_1.PolicyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [Action],
        description: 'The actions associated with the policy',
        example: [
            {
                id: '123e4567-e89b-12d3-a456-426614174001',
                name: 'ReadUserProfile',
            },
            {
                id: '123e4567-e89b-12d3-a456-426614174002',
                name: 'ViewDashboard',
            },
        ],
    }),
    __metadata("design:type", Array)
], PolicyDetailData.prototype, "actions", void 0);
class PolicyDetailResponseDto extends ApiDocumentResponse_1.ApiDocumentResponse {
}
exports.PolicyDetailResponseDto = PolicyDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: PolicyDetailData,
    }),
    __metadata("design:type", PolicyDetailData)
], PolicyDetailResponseDto.prototype, "data", void 0);
//# sourceMappingURL=PolicyDetailResponseDto.js.map