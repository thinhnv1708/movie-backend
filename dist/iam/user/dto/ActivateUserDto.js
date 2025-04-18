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
exports.ActivateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const contants_1 = require("../../../lib/contants");
class ActivateUserDto {
}
exports.ActivateUserDto = ActivateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token for user activation',
        example: '1a2b3c4d5e6f7g8h9i0j',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActivateUserDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        example: 'securepassword123',
    }),
    (0, class_validator_1.Matches)(contants_1.PasswordRegex),
    __metadata("design:type", String)
], ActivateUserDto.prototype, "password", void 0);
//# sourceMappingURL=ActivateUserDto.js.map