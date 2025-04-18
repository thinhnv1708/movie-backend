"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionModule = void 0;
const common_1 = require("@nestjs/common");
const ActionController_1 = require("./ActionController");
const ActionService_1 = require("./ActionService");
const ActionRepository_1 = require("./ActionRepository");
let ActionModule = class ActionModule {
};
exports.ActionModule = ActionModule;
exports.ActionModule = ActionModule = __decorate([
    (0, common_1.Module)({
        controllers: [ActionController_1.ActionController],
        providers: [
            {
                provide: 'ActionRepo',
                useClass: ActionRepository_1.ActionRepository,
            },
            ActionService_1.ActionService,
        ],
        exports: ['ActionRepo', ActionService_1.ActionService],
    })
], ActionModule);
//# sourceMappingURL=ActionModule.js.map