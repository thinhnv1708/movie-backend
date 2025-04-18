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
exports.CreateGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateGroupDto {
}
exports.CreateGroupDto = CreateGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the group',
        example: 'Administrators',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional description of the group',
        example: 'Group with administrative privileges',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of policy IDs associated with this group',
        type: [String],
        example: [
            '123e4567-e89b-12d3-a456-426614174000',
            '123e4567-e89b-12d3-a456-426614174001',
        ],
    }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateGroupDto.prototype, "policyIds", void 0);
//# sourceMappingURL=CreateGroupDto.js.map