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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
const BusinessError_1 = require("../../lib/BusinessError");
const idGenerator_1 = require("../../lib/idGenerator");
const StatusCode_1 = require("../../lib/StatusCode");
const getTimestampSeconds_1 = require("../../lib/utils/getTimestampSeconds");
const SendMessageService_1 = require("../../send-message/SendMessageService");
const PasswordHandler_1 = require("../../lib/helpers/PasswordHandler");
let UserService = class UserService {
    constructor(userRepo, sendMessageService, configService, passwordHandler) {
        this.userRepo = userRepo;
        this.sendMessageService = sendMessageService;
        this.configService = configService;
        this.passwordHandler = passwordHandler;
    }
    async createUser(createUserData) {
        let { policyIds, groupIds } = createUserData;
        const email = createUserData.email;
        const user = await this.userRepo.getUserByEmail(email);
        if (user) {
            throw new BusinessError_1.default(StatusCode_1.default.EMAIL_ALREADY_EXISTS);
        }
        if (policyIds.length > 0) {
            // make unique policyIds
            policyIds = [...new Set(policyIds)];
            const policies = await this.userRepo.getPoliciesByIds(policyIds);
            if (policies.length !== policyIds.length) {
                throw new BusinessError_1.default(StatusCode_1.default.SOME_POLICY_NOT_FOUND);
            }
        }
        if (groupIds.length > 0) {
            // make unique groupIds
            groupIds = [...new Set(groupIds)];
            const groups = await this.userRepo.getGroupsByIds(groupIds);
            if (groups.length !== groupIds.length) {
                throw new BusinessError_1.default(StatusCode_1.default.SOME_POLICY_NOT_FOUND);
            }
        }
        const now = (0, getTimestampSeconds_1.default)();
        const newUser = {
            id: (0, idGenerator_1.default)(),
            isRoot: false,
            activated: false,
            email,
            password: '',
            policyIds,
            groupIds,
            createdAt: now,
            updatedAt: now,
        };
        await this.userRepo.createUser(newUser);
        return newUser;
    }
    hashToken(token) {
        const hash = crypto.createHash('sha256');
        hash.update(token);
        return hash.digest('hex');
    }
    async makeUserToken(data) {
        const { userId, expiresIn } = data;
        const token = crypto.randomBytes(32).toString('hex');
        const now = (0, getTimestampSeconds_1.default)();
        const expiresAt = now + expiresIn;
        const hashedToken = this.hashToken(token);
        const userToken = {
            id: (0, idGenerator_1.default)(),
            userId,
            token: hashedToken,
            createdAt: now,
            updatedAt: now,
            expiresAt,
        };
        await this.userRepo.saveUserToken(userToken);
        return token;
    }
    async sendMessageActivateUser(userId) {
        const user = await this.userRepo.getUserById(userId);
        if (!user) {
            throw new BusinessError_1.default(StatusCode_1.default.DATA_NOT_FOUND);
        }
        if (user.activated) {
            throw new BusinessError_1.default(StatusCode_1.default.USER_ALREADY_ACTIVATED);
        }
        const iamConfig = this.configService.get('iam');
        const token = await this.makeUserToken({
            userId: user.id,
            expiresIn: iamConfig.activateUserTokenExpiresIn,
        });
        const activateUrl = iamConfig.activateUserUrl.replace('{token}', token);
        const sendMessageResponse = await this.sendMessageService.send({
            to: user.email,
            subject: 'Activate your account',
            content: `Click here to activate your account: ${activateUrl}`,
        });
        return sendMessageResponse;
    }
    async activateUser(data) {
        const { token, password } = data;
        const hashedToken = this.hashToken(token);
        const userToken = await this.userRepo.getUserTokenByToken(hashedToken);
        if (!userToken) {
            throw new BusinessError_1.default(StatusCode_1.default.USER_TOKEN_NOT_FOUND);
        }
        const now = (0, getTimestampSeconds_1.default)();
        if (now > userToken.expiresAt) {
            throw new BusinessError_1.default(StatusCode_1.default.USER_TOKEN_EXPIRED);
        }
        const user = await this.userRepo.getUserById(userToken.userId);
        if (!user) {
            throw new BusinessError_1.default(StatusCode_1.default.USER_NOT_FOUND);
        }
        if (user.activated) {
            throw new BusinessError_1.default(StatusCode_1.default.USER_ALREADY_ACTIVATED);
        }
        const iamConfig = this.configService.get('iam');
        const hashedPassword = this.passwordHandler.hash(password, iamConfig.passwordSecret);
        await this.userRepo.updateActivatedUser(user.id, hashedPassword);
        return {
            message: 'User activated successfully',
        };
    }
    async updateUser(userId, updateUserData) {
        let { policyIds, groupIds } = updateUserData;
        const user = await this.userRepo.getUserById(userId);
        if (!user) {
            throw new BusinessError_1.default(StatusCode_1.default.DATA_NOT_FOUND);
        }
        if (user.isRoot) {
            throw new BusinessError_1.default(StatusCode_1.default.FORBIDDEN);
        }
        // check permission exists
        if (policyIds?.length > 0) {
            // make unique policyIds
            policyIds = [...new Set(policyIds)];
            const policies = await this.userRepo.getPoliciesByIds(policyIds);
            if (policies.length !== policyIds.length) {
                throw new BusinessError_1.default(StatusCode_1.default.SOME_POLICY_NOT_FOUND);
            }
        }
        if (groupIds?.length > 0) {
            // make unique groupIds
            groupIds = [...new Set(groupIds)];
            const groups = await this.userRepo.getGroupsByIds(groupIds);
            if (groups.length !== groupIds.length) {
                throw new BusinessError_1.default(StatusCode_1.default.SOME_POLICY_NOT_FOUND);
            }
        }
        const dataUpdate = {
            policyIds,
            groupIds,
            updatedAt: (0, getTimestampSeconds_1.default)(),
        };
        await this.userRepo.updateUser(user.id, dataUpdate);
    }
    async getUserDetails(userId) {
        const user = await this.userRepo.getUserById(userId);
        if (!user) {
            throw new BusinessError_1.default(StatusCode_1.default.DATA_NOT_FOUND);
        }
        const [groups, policies] = await Promise.all([
            this.userRepo.getGroupsOfUser(user.id),
            this.userRepo.getPoliciesOfUser(user.id),
        ]);
        let allPolicies = policies;
        if (groups.length > 0) {
            const policiesOfGroup = await this.userRepo.getPoliciesOfGroups(groups.map((group) => group.id));
            allPolicies = allPolicies.concat(policiesOfGroup);
        }
        delete user.password;
        return {
            ...user,
            groups,
            policies: allPolicies,
        };
    }
    async deleteUser(userId) {
        const user = await this.userRepo.getUserById(userId);
        if (!user) {
            throw new BusinessError_1.default(StatusCode_1.default.DATA_NOT_FOUND);
        }
        if (user.isRoot) {
            throw new BusinessError_1.default(StatusCode_1.default.FORBIDDEN);
        }
        await this.userRepo.deleteUser(user.id);
        return {
            message: 'User deleted successfully',
        };
    }
    async getUsers(params) {
        const { page, limit, email, activated } = params;
        const result = await this.userRepo.getUsers({
            page,
            limit,
            email,
            activated,
        });
        return {
            items: result.users,
            total: result.total,
            page,
            limit,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepo')),
    __metadata("design:paramtypes", [Object, SendMessageService_1.SendMessageService,
        config_1.ConfigService,
        PasswordHandler_1.PasswordHandler])
], UserService);
//# sourceMappingURL=UserService.js.map