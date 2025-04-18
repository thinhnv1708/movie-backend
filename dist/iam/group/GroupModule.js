"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModule = void 0;
const common_1 = require("@nestjs/common");
const GroupController_1 = require("./GroupController");
const GroupService_1 = require("./GroupService");
const GroupRepository_1 = require("./GroupRepository");
let GroupModule = class GroupModule {
};
exports.GroupModule = GroupModule;
exports.GroupModule = GroupModule = __decorate([
    (0, common_1.Module)({
        controllers: [GroupController_1.GroupController],
        providers: [
            {
                provide: 'GroupRepo',
                useClass: GroupRepository_1.GroupRepository,
            },
            GroupService_1.GroupService,
        ],
    })
], GroupModule);
//# sourceMappingURL=GroupModule.js.map