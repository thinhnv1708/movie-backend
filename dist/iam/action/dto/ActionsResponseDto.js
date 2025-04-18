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
exports.ActionsResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const ApiDocumentResponse_1 = require("../../../lib/ApiDocumentResponse");
class ActionRepsponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the action',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], ActionRepsponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the feature this action belongs to',
        example: '123e4567-e89b-12d3-a456-426614174001',
    }),
    __metadata("design:type", String)
], ActionRepsponseDto.prototype, "featureId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the action',
        example: 'createUser',
    }),
    __metadata("design:type", String)
], ActionRepsponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of what the action does',
        example: 'Create a new user in the system',
    }),
    __metadata("design:type", String)
], ActionRepsponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTTP method of the action',
        example: 'POST',
        enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }),
    __metadata("design:type", String)
], ActionRepsponseDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'API endpoint path of the action',
        example: '/iam/users',
    }),
    __metadata("design:type", String)
], ActionRepsponseDto.prototype, "path", void 0);
class ActionsData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the feature',
        example: '123e4567-e89b-12d3-a456-426614174001',
    }),
    __metadata("design:type", String)
], ActionsData.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the parent feature (if this is a sub-feature)',
        example: '123e4567-e89b-12d3-a456-426614174002',
        nullable: true,
    }),
    __metadata("design:type", String)
], ActionsData.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the feature',
        example: 'User Management',
    }),
    __metadata("design:type", String)
], ActionsData.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the feature',
        example: 'Allows managing users in the system',
    }),
    __metadata("design:type", String)
], ActionsData.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of actions associated with this feature',
        type: [ActionRepsponseDto],
    }),
    __metadata("design:type", Array)
], ActionsData.prototype, "actions", void 0);
class ActionsResponseDto extends ApiDocumentResponse_1.ApiDocumentResponse {
}
exports.ActionsResponseDto = ActionsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of all features with their associated actions',
        type: [ActionsData],
    }),
    __metadata("design:type", Array)
], ActionsResponseDto.prototype, "data", void 0);
//# sourceMappingURL=ActionsResponseDto.js.map