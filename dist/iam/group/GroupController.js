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
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ResponseDataInterceptor_1 = require("../../lib/interceptors/ResponseDataInterceptor");
const LimitConverterPipe_1 = require("../../lib/pipes/LimitConverterPipe");
const PageConverterPipe_1 = require("../../lib/pipes/PageConverterPipe");
const GroupService_1 = require("./GroupService");
const CreateGroupDto_1 = require("./dto/CreateGroupDto");
const UpdateGroupDto_1 = require("./dto/UpdateGroupDto");
const responses_1 = require("./dto/responses");
const AuthenticationGuard_1 = require("../../guards/AuthenticationGuard");
const AuthorizationGuard_1 = require("../../guards/AuthorizationGuard");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async getGroups(page, limit, name) {
        return this.groupService.listGroups({
            page,
            limit,
            name,
        });
    }
    getDetailGroup(id) {
        return this.groupService.getDetailGroup(id);
    }
    async createGroup(body) {
        return this.groupService.createGroup(body);
    }
    async updateGroup(id, body) {
        return this.groupService.updateGroup(id, body);
    }
    async deleteGroup(id) {
        return this.groupService.deleteGroup(id);
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a list of groups' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of groups retrieved successfully',
        type: responses_1.GroupsResponseDto,
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', required: false }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('page', new PageConverterPipe_1.PageConverterPipe())),
    __param(1, (0, common_1.Query)('limit', new LimitConverterPipe_1.LimitConverterPipe())),
    __param(2, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getGroups", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a group by ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Group retrieved successfully',
        type: responses_1.GroupDetailResponseDto,
    }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getDetailGroup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new group' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Group created successfully',
        type: responses_1.CreateGroupResponseDto,
    }),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateGroupDto_1.CreateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "createGroup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a group' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Group updated successfully',
        type: responses_1.CreateGroupResponseDto,
    }),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateGroupDto_1.UpdateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "updateGroup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a group' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Group deleted successfully',
        type: responses_1.CreateGroupResponseDto,
    }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "deleteGroup", null);
exports.GroupController = GroupController = __decorate([
    (0, swagger_1.ApiTags)('Groups'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(AuthenticationGuard_1.AuthenticationGuard, AuthorizationGuard_1.AuthorizationGuard),
    (0, common_1.UseInterceptors)(ResponseDataInterceptor_1.ResponseDataInterceptor),
    (0, common_1.Controller)('/iam/group'),
    __metadata("design:paramtypes", [GroupService_1.GroupService])
], GroupController);
//# sourceMappingURL=GroupController.js.map