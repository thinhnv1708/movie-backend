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
exports.GroupDetailResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const ApiDocumentResponse_1 = require("../../../../lib/ApiDocumentResponse");
const GroupDto_1 = require("./GroupDto");
class PolicyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the policy',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], PolicyDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the policy',
        example: 'ReadOnlyAccess',
    }),
    __metadata("design:type", String)
], PolicyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Policy is default or not',
        example: false,
    }),
    __metadata("design:type", Boolean)
], PolicyDto.prototype, "isDefault", void 0);
class GroupDetailData extends GroupDto_1.GroupDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of policies associated with this group',
        type: [PolicyDto],
    }),
    __metadata("design:type", Array)
], GroupDetailData.prototype, "policies", void 0);
class GroupDetailResponseDto extends ApiDocumentResponse_1.ApiDocumentResponse {
}
exports.GroupDetailResponseDto = GroupDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: GroupDetailData,
    }),
    __metadata("design:type", GroupDetailData)
], GroupDetailResponseDto.prototype, "data", void 0);
//# sourceMappingURL=GroupDetailResponseDto.js.map