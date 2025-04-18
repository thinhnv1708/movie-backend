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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const GroupEntity_1 = require("../../postgre/entities/GroupEntity");
const PolicyEntity_1 = require("../../postgre/entities/PolicyEntity");
const UserEntity_1 = require("../../postgre/entities/UserEntity");
const UserGroupEntity_1 = require("../../postgre/entities/UserGroupEntity");
const UserPolicyEntity_1 = require("../../postgre/entities/UserPolicyEntity");
const UserTokenEntity_1 = require("../../postgre/entities/UserTokenEntity");
const getSkip_1 = require("../../lib/utils/getSkip");
let UserRepository = class UserRepository {
    constructor(dataSource, userModel, policyModel, groupModel, userTokenModel) {
        this.dataSource = dataSource;
        this.userModel = userModel;
        this.policyModel = policyModel;
        this.groupModel = groupModel;
        this.userTokenModel = userTokenModel;
    }
    async getUserById(id) {
        return this.userModel.findOne({ where: { id } });
    }
    async getUserByEmail(email) {
        return this.userModel.findOne({ where: { email } });
    }
    async getPoliciesByIds(policyIds) {
        return this.policyModel.find({
            where: { id: (0, typeorm_1.In)(policyIds) },
            select: { id: true },
        });
    }
    getGroupsByIds(groupIds) {
        return this.groupModel.find({
            where: { id: (0, typeorm_1.In)(groupIds) },
            select: { id: true },
        });
    }
    async createUser(data) {
        const { id, isRoot, activated, email, password, policyIds, groupIds, createdAt, updatedAt, } = data;
        await this.dataSource.transaction(async (transactionalEntityManager) => {
            const userModel = transactionalEntityManager.getRepository(UserEntity_1.UserEntity);
            const userPolicyModel = transactionalEntityManager.getRepository(UserPolicyEntity_1.UserPolicyEntity);
            const userGroupModel = transactionalEntityManager.getRepository(UserGroupEntity_1.UserGroupEntity);
            await userModel.insert({
                id,
                isRoot,
                activated,
                email,
                password,
                createdAt,
                updatedAt,
            });
            if (policyIds.length > 0) {
                await userPolicyModel.insert(policyIds.map((policyId) => ({ userId: id, policyId })));
            }
            if (groupIds.length > 0) {
                await userGroupModel.insert(groupIds.map((groupId) => ({ userId: id, groupId })));
            }
        });
    }
    async updateUser(userId, data) {
        const { policyIds, groupIds } = data;
        await this.dataSource.transaction(async (transactionalEntityManager) => {
            const userPolicyModel = transactionalEntityManager.getRepository(UserPolicyEntity_1.UserPolicyEntity);
            const userGroupModel = transactionalEntityManager.getRepository(UserGroupEntity_1.UserGroupEntity);
            if (policyIds) {
                await userPolicyModel.delete({ userId });
                if (policyIds.length > 0) {
                    await userPolicyModel.insert(policyIds.map((policyId) => ({ userId, policyId })));
                }
            }
            if (groupIds) {
                await userGroupModel.delete({ userId });
                if (groupIds.length > 0) {
                    await userGroupModel.insert(groupIds.map((groupId) => ({ userId, groupId })));
                }
            }
        });
    }
    async saveUserToken(data) {
        const { id, userId, token, createdAt, expiresAt } = data;
        await this.dataSource.transaction(async (transactionalEntityManager) => {
            const userTokenModel = transactionalEntityManager.getRepository(UserTokenEntity_1.UserTokenEntity);
            await userTokenModel.delete({ userId });
            await userTokenModel.insert({
                id,
                userId,
                token,
                createdAt,
                expiresAt,
            });
        });
    }
    async getUserTokenByToken(token) {
        return this.userTokenModel.findOne({ where: { token } });
    }
    async updateActivatedUser(userId, password) {
        await this.dataSource.transaction(async (transactionalEntityManager) => {
            const userModel = transactionalEntityManager.getRepository(UserEntity_1.UserEntity);
            const userTokenModel = transactionalEntityManager.getRepository(UserTokenEntity_1.UserTokenEntity);
            await userModel.update(userId, {
                activated: true,
                password,
            });
            await userTokenModel.delete({ userId });
        });
    }
    async deleteUser(userId) {
        await this.userModel.delete(userId);
    }
    async getGroupsOfUser(userId) {
        // const userroups = await
        return;
    }
    getPoliciesOfGroups(groupIds) {
        return;
    }
    getPoliciesOfUser(userId) {
        return;
    }
    async getUsers(params) {
        const { page, limit, email, activated } = params;
        const skip = (0, getSkip_1.getSkip)(page, limit);
        // Build where conditions
        const where = {};
        if (email) {
            where.email = (0, typeorm_1.Like)(`%${email}%`);
        }
        if (activated !== undefined) {
            where.activated = activated;
        }
        // Query with pagination
        const [users, total] = await this.userModel.findAndCount({
            where,
            select: {
                id: true,
                isRoot: true,
                activated: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        return { users, total };
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATA_SOURCE')),
    __param(1, (0, common_1.Inject)(UserEntity_1.UserEntity)),
    __param(2, (0, common_1.Inject)(PolicyEntity_1.PolicyEntity)),
    __param(3, (0, common_1.Inject)(GroupEntity_1.GroupEntity)),
    __param(4, (0, common_1.Inject)(UserTokenEntity_1.UserTokenEntity)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], UserRepository);
//# sourceMappingURL=UserRepository.js.map