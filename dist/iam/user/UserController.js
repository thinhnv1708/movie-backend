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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const AuthenticationGuard_1 = require("../../guards/AuthenticationGuard");
const AuthorizationGuard_1 = require("../../guards/AuthorizationGuard");
const ResponseDataInterceptor_1 = require("../../lib/interceptors/ResponseDataInterceptor");
const LimitConverterPipe_1 = require("../../lib/pipes/LimitConverterPipe");
const PageConverterPipe_1 = require("../../lib/pipes/PageConverterPipe");
const UserService_1 = require("./UserService");
const ActivateUserDto_1 = require("./dto/ActivateUserDto");
const CreateUserDto_1 = require("./dto/CreateUserDto");
const SendMessageActivateUserDto_1 = require("./dto/SendMessageActivateUserDto");
const UpdateUserDto_1 = require("./dto/UpdateUserDto");
const response_1 = require("./dto/response");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers(page, limit, email, activated) {
        return this.userService.getUsers({
            page,
            limit,
            email,
            activated: activated === undefined ? undefined : activated === 'true',
        });
    }
    getUserDetails(id) {
        return this.userService.getUserDetails(id);
    }
    createUser(body) {
        return this.userService.createUser(body);
    }
    sendMessageActivateUser(body) {
        return this.userService.sendMessageActivateUser(body.userId);
    }
    activateUser(body) {
        return this.userService.activateUser(body);
    }
    async updateUser(id, body) {
        return this.userService.updateUser(id, body);
    }
    async deleteUser(id) {
        return this.userService.deleteUser(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a list of users' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of users retrieved successfully',
        type: response_1.UsersResponseDto,
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'email', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'activated', required: false, enum: ['true', 'false'] }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('page', new PageConverterPipe_1.PageConverterPipe())),
    __param(1, (0, common_1.Query)('limit', new LimitConverterPipe_1.LimitConverterPipe())),
    __param(2, (0, common_1.Query)('email')),
    __param(3, (0, common_1.Query)('activated')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User retrieved successfully',
        type: response_1.UserDetailResponseDto,
    }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserDetails", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User created successfully',
        type: response_1.CreateUserResponseDto,
    }),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Send activation email to user',
        description: 'Sends an email with activation link to the specified user',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Activation email sent successfully',
        type: response_1.SendActivateUserResponseDto,
    }),
    (0, common_1.Post)('/sendMessageActivateUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SendMessageActivateUserDto_1.SendMessageActivateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "sendMessageActivateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Activate user account',
        description: 'Activates a user account using the provided token',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User activated successfully',
        type: response_1.ActivateUserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid or expired token',
        schema: {
            example: {
                statusCode: 400,
                message: 'Token expired or not found',
            },
        },
    }),
    (0, common_1.Post)('/activate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ActivateUserDto_1.ActivateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "activateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User updated successfully',
        type: response_1.CreateUserResponseDto,
    }),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUserDto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User deleted successfully',
        type: response_1.CreateUserResponseDto,
    }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User Management'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(AuthenticationGuard_1.AuthenticationGuard, AuthorizationGuard_1.AuthorizationGuard),
    (0, common_1.UseInterceptors)(ResponseDataInterceptor_1.ResponseDataInterceptor),
    (0, common_1.Controller)('/iam/user'),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
//# sourceMappingURL=UserController.js.map