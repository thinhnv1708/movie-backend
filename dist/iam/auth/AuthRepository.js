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
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("../../postgre/entities/UserEntity");
const UserPolicyEntity_1 = require("../../postgre/entities/UserPolicyEntity");
const GroupPolicyEntity_1 = require("../../postgre/entities/GroupPolicyEntity");
const UserGroupEntity_1 = require("../../postgre/entities/UserGroupEntity");
const PolicyActionEntity_1 = require("../../postgre/entities/PolicyActionEntity");
const ActionEntity_1 = require("../../postgre/entities/ActionEntity");
let AuthRepository = class AuthRepository {
    constructor(userModel, userPolicyModel, userGroupModel, groupPolicyModel, policyActionModel) {
        this.userModel = userModel;
        this.userPolicyModel = userPolicyModel;
        this.userGroupModel = userGroupModel;
        this.groupPolicyModel = groupPolicyModel;
        this.policyActionModel = policyActionModel;
        this.getUserActions('2a0f7c1d-0026-4c8d-8ce7-389bfdf971b0');
    }
    getUserByEmail(email) {
        return this.userModel.findOne({
            where: { email },
            select: {
                id: true,
                activated: true,
                isRoot: true,
                email: true,
                password: true,
            },
        });
    }
    async getUserById(userId) {
        const user = await this.userModel.findOne({
            where: { id: userId },
            select: {
                id: true,
            },
        });
        return user;
    }
    async getUserActions(userId) {
        const [userPolicies, userGroups] = await Promise.all([
            this.userPolicyModel.find({
                where: { userId },
            }),
            this.userGroupModel.find({
                where: { userId },
            }),
        ]);
        let policyIds = userPolicies.map((p) => p.policyId);
        if (userGroups.length > 0) {
            const groupIds = userGroups.map((g) => g.groupId);
            const groupPolicies = await this.groupPolicyModel.find({
                where: { groupId: (0, typeorm_1.In)(groupIds) },
            });
            policyIds = policyIds.concat(groupPolicies.map((p) => p.policyId));
        }
        policyIds = [...new Set(policyIds)];
        policyIds = policyIds.map((p) => `'${p}'`);
        if (policyIds.length === 0) {
            return [];
        }
        const actions = await this.policyActionModel
            .createQueryBuilder('policyAction')
            .leftJoin(ActionEntity_1.ActionEntity, 'action', `action.id = policyAction.actionId`)
            .where(`policyAction.policyId IN (${policyIds.join(',')})`)
            .select([
            'action.id as id',
            'action.method as method',
            'action.path as path',
        ])
            .execute();
        return actions;
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(UserEntity_1.UserEntity)),
    __param(1, (0, common_1.Inject)(UserPolicyEntity_1.UserPolicyEntity)),
    __param(2, (0, common_1.Inject)(UserGroupEntity_1.UserGroupEntity)),
    __param(3, (0, common_1.Inject)(GroupPolicyEntity_1.GroupPolicyEntity)),
    __param(4, (0, common_1.Inject)(PolicyActionEntity_1.PolicyActionEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], AuthRepository);
//# sourceMappingURL=AuthRepository.js.map