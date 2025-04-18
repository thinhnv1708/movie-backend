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
exports.UserDetailResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const ApiDocumentResponse_1 = require("../../../../lib/ApiDocumentResponse");
const UserDto_1 = require("./UserDto");
class GroupDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the group',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], GroupDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the group',
        example: 'Administrators',
    }),
    __metadata("design:type", String)
], GroupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the group',
        example: 'Group with administrative privileges',
    }),
    __metadata("design:type", String)
], GroupDto.prototype, "description", void 0);
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
class UserDetailData extends UserDto_1.UserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of groups this user belongs to',
        type: [GroupDto],
    }),
    __metadata("design:type", Array)
], UserDetailData.prototype, "groups", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of policies directly assigned to this user',
        type: [PolicyDto],
    }),
    __metadata("design:type", Array)
], UserDetailData.prototype, "policies", void 0);
class UserDetailResponseDto extends ApiDocumentResponse_1.ApiDocumentResponse {
}
exports.UserDetailResponseDto = UserDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: UserDetailData,
    }),
    __metadata("design:type", UserDetailData)
], UserDetailResponseDto.prototype, "data", void 0);
//# sourceMappingURL=UserDetailResponseDto.js.map