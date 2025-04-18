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
exports.ActivateUserResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ActivateUserResponseDto {
}
exports.ActivateUserResponseDto = ActivateUserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the activation operation',
        example: true
    }),
    __metadata("design:type", Boolean)
], ActivateUserResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message describing the result of the activation',
        example: 'User activated successfully'
    }),
    __metadata("design:type", String)
], ActivateUserResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID of the activated account',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], ActivateUserResponseDto.prototype, "userId", void 0);
//# sourceMappingURL=ActivateUserResponseDto.js.map