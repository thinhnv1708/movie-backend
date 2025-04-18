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
exports.PolicyRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const getSkip_1 = require("../../lib/utils/getSkip");
const ActionEntity_1 = require("../../postgre/entities/ActionEntity");
const PolicyActionEntity_1 = require("../../postgre/entities/PolicyActionEntity");
const PolicyEntity_1 = require("../../postgre/entities/PolicyEntity");
let PolicyRepository = class PolicyRepository {
    constructor(dataSource, policyModel, actionModel) {
        this.dataSource = dataSource;
        this.policyModel = policyModel;
        this.actionModel = actionModel;
    }
    async getPolicy(id) {
        return this.policyModel.findOne({ where: { id } });
    }
    async createPolicy(data) {
        const { id, name, description, isDefault, actionIds, createdAt, updatedAt, } = data;
        await this.dataSource.transaction(async (transactionalEntityManager) => {
            const policyModel = transactionalEntityManager.getRepository(PolicyEntity_1.PolicyEntity);
            const policyActionModel = transactionalEntityManager.getRepository(PolicyActionEntity_1.PolicyActionEntity);
            await policyModel.insert({
                id,
                name,
                description,
                isDefault,
                createdAt,
                updatedAt,
            });
            await policyActionModel.insert(actionIds.map((actionId) => ({
                policyId: id,
                actionId,
            })));
        });
    }
    async getActionsByIds(actionIds) {
        return this.actionModel.find({
            where: { id: (0, typeorm_1.In)(actionIds) },
            select: { id: true },
        });
    }
    async updatePolicy(data) {
        const { id, name, description, actionIds, updatedAt } = data;
        await this.dataSource.transaction(async (transactionalEntityManager) => {
            const policyActionModel = transactionalEntityManager.getRepository(PolicyActionEntity_1.PolicyActionEntity);
            const policyModel = transactionalEntityManager.getRepository(PolicyEntity_1.PolicyEntity);
            await policyModel.update({ id }, {
                ...(name && { name }),
                ...(description && { description }),
                updatedAt,
            });
            if (actionIds?.length > 0) {
                await policyActionModel.delete({ policyId: id });
                await policyActionModel.insert(actionIds.map((actionId) => ({ policyId: id, actionId })));
            }
        });
    }
    async deletePolicy(id) {
        await this.policyModel.delete({ id });
    }
    // ///// query
    async listPolicies(query) {
        const { page, limit, name, isDefault } = query;
        const [items, total] = await this.policyModel.findAndCount({
            where: {
                ...(name && { name: (0, typeorm_1.Like)(`%${name}%`) }),
                ...(isDefault !== undefined && { isDefault }),
            },
            take: limit,
            skip: (0, getSkip_1.getSkip)(page, limit),
        });
        return {
            total,
            items,
        };
    }
    async getDetailPolicy(id) {
        const result = await this.policyModel.findOne({
            where: { id },
            relations: {
                actions: true,
            },
        });
        if (!result) {
            return null;
        }
        const { name, description, isDefault, actions, createdAt, updatedAt } = result;
        return {
            id,
            name,
            description,
            isDefault,
            actions: actions.map((action) => ({ id: action.id, name: action.name })),
            createdAt,
            updatedAt,
        };
    }
};
exports.PolicyRepository = PolicyRepository;
exports.PolicyRepository = PolicyRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATA_SOURCE')),
    __param(1, (0, common_1.Inject)(PolicyEntity_1.PolicyEntity)),
    __param(2, (0, common_1.Inject)(ActionEntity_1.ActionEntity)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository,
        typeorm_1.Repository])
], PolicyRepository);
//# sourceMappingURL=PolicyRepository.js.map