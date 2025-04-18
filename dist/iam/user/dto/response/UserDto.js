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
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the user',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address of the user',
        example: 'user@example.com',
    }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Full name of the user',
        example: 'John Doe',
    }),
    __metadata("design:type", String)
], UserDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the user account is activated',
        example: true,
    }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "activated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the user has root privileges',
        example: false,
    }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isRoot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp when the user was logined',
        example: 1617123456,
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "lastLogin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp when the user was created',
        example: 1617123456,
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp when the user was last updated',
        example: 1617123789,
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=UserDto.js.map