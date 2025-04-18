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
exports.PolicyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PolicyDto {
}
exports.PolicyDto = PolicyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the policy',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], PolicyDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the policy',
        example: 'ReadOnlyAccess'
    }),
    __metadata("design:type", String)
], PolicyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The description of the policy',
        example: 'Provides read-only access to resources'
    }),
    __metadata("design:type", String)
], PolicyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the policy is a default policy',
        example: false
    }),
    __metadata("design:type", Boolean)
], PolicyDto.prototype, "isDefault", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The creation timestamp of the policy',
        example: 1617123456
    }),
    __metadata("design:type", Number)
], PolicyDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The last update timestamp of the policy',
        example: 1617123789
    }),
    __metadata("design:type", Number)
], PolicyDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=PolicyDto.js.map