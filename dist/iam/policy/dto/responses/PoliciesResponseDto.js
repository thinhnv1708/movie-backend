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
exports.PoliciesResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const PolicyDto_1 = require("./PolicyDto");
const ApiDocumentResponse_1 = require("../../../../lib/ApiDocumentResponse");
class PoliciesData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of policies matching the criteria',
        example: 42,
    }),
    __metadata("design:type", Number)
], PoliciesData.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PolicyDto_1.PolicyDto],
        description: 'List of policies for the current page',
    }),
    __metadata("design:type", Array)
], PoliciesData.prototype, "items", void 0);
class PoliciesResponseDto extends ApiDocumentResponse_1.ApiDocumentResponse {
}
exports.PoliciesResponseDto = PoliciesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: PoliciesData }),
    __metadata("design:type", PoliciesData)
], PoliciesResponseDto.prototype, "data", void 0);
//# sourceMappingURL=PoliciesResponseDto.js.map