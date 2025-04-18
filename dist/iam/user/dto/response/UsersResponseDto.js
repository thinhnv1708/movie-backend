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
exports.UsersResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const UserDto_1 = require("./UserDto");
const ApiDocumentResponse_1 = require("../../../../lib/ApiDocumentResponse");
class UsersData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of users available',
        example: 42,
    }),
    __metadata("design:type", Number)
], UsersData.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of users for the current page',
        type: [UserDto_1.UserDto],
    }),
    __metadata("design:type", Array)
], UsersData.prototype, "items", void 0);
class UsersResponseDto extends ApiDocumentResponse_1.ApiDocumentResponse {
}
exports.UsersResponseDto = UsersResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: UsersData }),
    __metadata("design:type", UsersData)
], UsersResponseDto.prototype, "data", void 0);
//# sourceMappingURL=UsersResponseDto.js.map