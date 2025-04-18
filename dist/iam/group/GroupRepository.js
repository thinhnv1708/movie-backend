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
exports.GroupRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const getSkip_1 = require("../../lib/utils/getSkip");
const GroupEntity_1 = require("../../postgre/entities/GroupEntity");
const GroupPolicyEntity_1 = require("../../postgre/entities/GroupPolicyEntity");
const PolicyEntity_1 = require("../../postgre/entities/PolicyEntity");
let GroupRepository = class GroupRepository {
    constructor(dataSource, groupModel, policyModel, groupPolicyModel) {
        this.dataSource = dataSource;
        this.groupModel = groupModel;
        this.policyModel = policyModel;
        this.groupPolicyModel = groupPolicyModel;
    }
    async getGroup(id) {
        return this.groupModel.findOne({ where: { id } });
    }
    async createGroup(data) {
        const { id, name, description, policyIds, createdAt, updatedAt, } = data;
        await this.dataSource.transaction(async (transactionalEntityManager) => {
            const groupModel = transactionalEntityManager.getRepository(GroupEntity_1.GroupEntity);
            const groupPolicyModel = transactionalEntityManager.getRepository(GroupPolicyEntity_1.GroupPolicyEntity);
            await groupModel.insert({
                id,
                name,
                description,
                createdAt,
                updatedAt,
            });
            if (policyIds.length > 0) {
                await groupPolicyModel.insert(policyIds.map((policyId) => ({
                    groupId: id,
                    policyId,
                })));
            }
        });
    }
    async getPoliciesByIds(policyIds) {
        return this.policyModel.find({
            where: { id: (0, typeorm_1.In)(policyIds) },
            select: { id: true },
        });
    }
    async updateGroup(data) {
        const { id, name, description, policyIds, updatedAt } = data;
        await this.dataSource.transaction(async (transactionalEntityManager) => {
            const groupPolicyModel = transactionalEntityManager.getRepository(GroupPolicyEntity_1.GroupPolicyEntity);
            const groupModel = transactionalEntityManager.getRepository(GroupEntity_1.GroupEntity);
            await groupModel.update({ id }, {
                ...(name && { name }),
                ...(description && { description }),
                updatedAt,
            });
            if (policyIds?.length > 0) {
                await groupPolicyModel.delete({ groupId: id });
                await groupPolicyModel.insert(policyIds.map((policyId) => ({ groupId: id, policyId })));
            }
        });
    }
    async deleteGroup(id) {
        await this.groupModel.delete({ id });
    }
    async listGroups(query) {
        const { page, limit, name } = query;
        const [items, total] = await this.groupModel.findAndCount({
            where: {
                ...(name && { name: (0, typeorm_1.Like)(`%${name}%`) }),
            },
            take: limit,
            skip: (0, getSkip_1.getSkip)(page, limit),
        });
        return {
            total,
            items,
        };
    }
    async getDetailGroup(id) {
        const group = await this.groupModel.findOne({
            where: { id },
        });
        if (!group) {
            return null;
        }
        const { name, description, createdAt, updatedAt } = group;
        const groupPolicies = await this.groupPolicyModel.find({
            where: { groupId: id },
        });
        const policyIds = groupPolicies.map((gp) => gp.policyId);
        const policies = policyIds.length > 0
            ? await this.policyModel.find({
                where: { id: (0, typeorm_1.In)(policyIds) },
                select: ['id', 'name'],
            })
            : [];
        return {
            id,
            name,
            description,
            policies,
            createdAt,
            updatedAt,
        };
    }
};
exports.GroupRepository = GroupRepository;
exports.GroupRepository = GroupRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATA_SOURCE')),
    __param(1, (0, common_1.Inject)(GroupEntity_1.GroupEntity)),
    __param(2, (0, common_1.Inject)(PolicyEntity_1.PolicyEntity)),
    __param(3, (0, common_1.Inject)(GroupPolicyEntity_1.GroupPolicyEntity)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], GroupRepository);
//# sourceMappingURL=GroupRepository.js.map