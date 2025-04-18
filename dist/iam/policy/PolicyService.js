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
exports.PolicyService = void 0;
const common_1 = require("@nestjs/common");
const BusinessError_1 = require("../../lib/BusinessError");
const idGenerator_1 = require("../../lib/idGenerator");
const StatusCode_1 = require("../../lib/StatusCode");
const getTimestampSeconds_1 = require("../../lib/utils/getTimestampSeconds");
let PolicyService = class PolicyService {
    constructor(policyRepo) {
        this.policyRepo = policyRepo;
    }
    async createPolicy(data) {
        const { name, description } = data;
        let actionIds = data.actionIds;
        // make unique actionIds
        actionIds = [...new Set(actionIds)];
        // check actionIds valid
        const actions = await this.policyRepo.getActionsByIds(actionIds);
        if (actions.length !== actionIds.length) {
            throw new BusinessError_1.default(StatusCode_1.default.SOME_ACTION_NOT_FOUND);
        }
        const now = (0, getTimestampSeconds_1.default)();
        const policyData = {
            id: (0, idGenerator_1.default)(),
            name,
            description,
            isDefault: false,
            actionIds,
            createdAt: now,
            updatedAt: now,
        };
        await this.policyRepo.createPolicy(policyData);
        return {
            id: policyData.id,
        };
    }
    async updatePolicy(policyId, data) {
        const { name, description, actionIds } = data;
        const policy = await this.policyRepo.getPolicy(policyId);
        if (!policy) {
            throw new BusinessError_1.default(StatusCode_1.default.DATA_NOT_FOUND);
        }
        if (policy.isDefault) {
            throw new BusinessError_1.default(StatusCode_1.default.CANNOT_MODIFY_DEFAULT_POLICY);
        }
        const policyData = {
            id: policyId,
            name,
            description,
            updatedAt: (0, getTimestampSeconds_1.default)(),
        };
        // check actionIds valid
        if (actionIds?.length > 0) {
            const actions = await this.policyRepo.getActionsByIds(actionIds);
            if (actions.length !== actionIds.length) {
                throw new BusinessError_1.default(StatusCode_1.default.SOME_ACTION_NOT_FOUND);
            }
            policyData.actionIds = actionIds;
        }
        await this.policyRepo.updatePolicy(policyData);
        return {
            id: policyData.id,
        };
    }
    async deletePolicy(id) {
        // check policyId valid
        const policy = await this.policyRepo.getPolicy(id);
        if (!policy) {
            throw new BusinessError_1.default(StatusCode_1.default.DATA_NOT_FOUND);
        }
        if (policy.isDefault) {
            throw new BusinessError_1.default(StatusCode_1.default.CANNOT_MODIFY_DEFAULT_POLICY);
        }
        await this.policyRepo.deletePolicy(id);
        return {
            id: policy.id,
        };
    }
    async listPolicies(query) {
        return this.policyRepo.listPolicies(query);
    }
    async getDetailPolicy(id) {
        const policy = await this.policyRepo.getDetailPolicy(id);
        if (!policy) {
            throw new BusinessError_1.default(StatusCode_1.default.DATA_NOT_FOUND);
        }
        return policy;
    }
};
exports.PolicyService = PolicyService;
exports.PolicyService = PolicyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PolicyRepo')),
    __metadata("design:paramtypes", [Object])
], PolicyService);
//# sourceMappingURL=PolicyService.js.map