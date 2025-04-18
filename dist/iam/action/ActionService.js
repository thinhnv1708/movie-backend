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
exports.ActionService = void 0;
const common_1 = require("@nestjs/common");
let ActionService = class ActionService {
    constructor(actionRepo) {
        this.actionRepo = actionRepo;
    }
    async getActions() {
        const [features, actions] = await Promise.all([
            this.actionRepo.getAllFeautures(),
            this.actionRepo.getAllActions(),
        ]);
        const featureMap = features.reduce((currentFeatureMap, feature) => {
            currentFeatureMap[feature.id] = {
                ...feature,
                actions: [],
            };
            return currentFeatureMap;
        }, {});
        actions.forEach((action) => {
            if (!featureMap[action.featureId]) {
                return;
            }
            featureMap[action.featureId].actions.push(action);
        });
        return Object.values(featureMap);
    }
};
exports.ActionService = ActionService;
exports.ActionService = ActionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ActionRepo')),
    __metadata("design:paramtypes", [Object])
], ActionService);
//# sourceMappingURL=ActionService.js.map