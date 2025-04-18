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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const BusinessError_1 = require("../../lib/BusinessError");
const idGenerator_1 = require("../../lib/idGenerator");
const StatusCode_1 = require("../../lib/StatusCode");
const getTimestampSeconds_1 = require("../../lib/utils/getTimestampSeconds");
let GroupService = class GroupService {
    constructor(groupRepo) {
        this.groupRepo = groupRepo;
    }
    async createGroup(data) {
        const { name, description } = data;
        let policyIds = data.policyIds;
        // make unique policyIds
        policyIds = [...new Set(policyIds)];
        // check policyIds valid
        const policies = await this.groupRepo.getPoliciesByIds(policyIds);
        if (policies.length !== policyIds.length) {
            throw new BusinessError_1.default(StatusCode_1.default.SOME_POLICY_NOT_FOUND);
        }
        const now = (0, getTimestampSeconds_1.default)();
        const groupData = {
            id: (0, idGenerator_1.default)(),
            name,
            description,
            policyIds,
            createdAt: now,
            updatedAt: now,
        };
        await this.groupRepo.createGroup(groupData);
        return {
            id: groupData.id,
        };
    }
    async updateGroup(groupId, data) {
        const { name, description, policyIds } = data;
        const group = await this.groupRepo.getGroup(groupId);
        if (!group) {
            throw new BusinessError_1.default(StatusCode_1.default.DATA_NOT_FOUND);
        }
        const groupData = {
            id: groupId,
            name,
            description,
            updatedAt: (0, getTimestampSeconds_1.default)(),
        };
        // check policyIds valid
        if (policyIds?.length > 0) {
            const policies = await this.groupRepo.getPoliciesByIds(policyIds);
            if (policies.length !== policyIds.length) {
                throw new BusinessError_1.default(StatusCode_1.default.SOME_POLICY_NOT_FOUND);
            }
            groupData.policyIds = policyIds;
        }
        await this.groupRepo.updateGroup(groupData);
        return {
            id: groupData.id,
        };
    }
    async deleteGroup(id) {
        // check groupId valid
        const group = await this.groupRepo.getGroup(id);
        if (!group) {
            throw new BusinessError_1.default(StatusCode_1.default.DATA_NOT_FOUND);
        }
        await this.groupRepo.deleteGroup(id);
        return {
            id,
        };
    }
    async listGroups(query) {
        return this.groupRepo.listGroups(query);
    }
    async getDetailGroup(id) {
        const group = await this.groupRepo.getDetailGroup(id);
        if (!group) {
            throw new BusinessError_1.default(StatusCode_1.default.DATA_NOT_FOUND);
        }
        return group;
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('GroupRepo')),
    __metadata("design:paramtypes", [Object])
], GroupService);
//# sourceMappingURL=GroupService.js.map