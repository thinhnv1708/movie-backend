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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const AuthenticationGuard_1 = require("../../guards/AuthenticationGuard");
const AuthorizationGuard_1 = require("../../guards/AuthorizationGuard");
const ResponseDataInterceptor_1 = require("../../lib/interceptors/ResponseDataInterceptor");
const LimitConverterPipe_1 = require("../../lib/pipes/LimitConverterPipe");
const PageConverterPipe_1 = require("../../lib/pipes/PageConverterPipe");
const CreatePolicyDto_1 = require("./dto/CreatePolicyDto");
const responses_1 = require("./dto/responses");
const UpdatePolicyDto_1 = require("./dto/UpdatePolicyDto");
const PolicyService_1 = require("./PolicyService");
let PolicyController = class PolicyController {
    constructor(policyService) {
        this.policyService = policyService;
    }
    async getPolicies(page, limit, name, isDefault) {
        return this.policyService.listPolicies({
            page,
            limit,
            name,
            isDefault: isDefault == undefined ? undefined : JSON.parse(isDefault),
        });
    }
    getDetailPolicy(id) {
        return this.policyService.getDetailPolicy(id);
    }
    async createPolicy(body) {
        return this.policyService.createPolicy(body);
    }
    async updatePolicy(id, body) {
        return this.policyService.updatePolicy(id, body);
    }
    async deletePolicy(id) {
        return this.policyService.deletePolicy(id);
    }
};
exports.PolicyController = PolicyController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a list of policies' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of policies retrieved successfully',
        type: responses_1.PoliciesResponseDto,
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isDefault', required: false, enum: ['true', 'false'] }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('page', new PageConverterPipe_1.PageConverterPipe())),
    __param(1, (0, common_1.Query)('limit', new LimitConverterPipe_1.LimitConverterPipe())),
    __param(2, (0, common_1.Query)('name')),
    __param(3, (0, common_1.Query)('isDefault')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "getPolicies", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a policy by ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Policy retrieved successfully',
        type: responses_1.PolicyDetailResponseDto,
    }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PolicyController.prototype, "getDetailPolicy", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new policy' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Policy created successfully',
        type: responses_1.CreatePolicyResponseDto,
    }),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePolicyDto_1.CreatePolicyDto]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "createPolicy", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a policy' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Policy updated successfully',
        type: responses_1.CreatePolicyResponseDto,
    }),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdatePolicyDto_1.UpdatePolicyDto]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "updatePolicy", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a policy' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Policy deleted successfully',
        type: responses_1.CreatePolicyResponseDto,
    }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "deletePolicy", null);
exports.PolicyController = PolicyController = __decorate([
    (0, swagger_1.ApiTags)('Policies'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(AuthenticationGuard_1.AuthenticationGuard, AuthorizationGuard_1.AuthorizationGuard),
    (0, common_1.UseInterceptors)(ResponseDataInterceptor_1.ResponseDataInterceptor),
    (0, common_1.Controller)('/iam/policy'),
    __metadata("design:paramtypes", [PolicyService_1.PolicyService])
], PolicyController);
//# sourceMappingURL=PolicyController.js.map