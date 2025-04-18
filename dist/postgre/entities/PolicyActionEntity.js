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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyActionEntity = void 0;
const typeorm_1 = require("typeorm");
let PolicyActionEntity = class PolicyActionEntity {
};
exports.PolicyActionEntity = PolicyActionEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'policy_id' }),
    __metadata("design:type", String)
], PolicyActionEntity.prototype, "policyId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'action_id' }),
    __metadata("design:type", String)
], PolicyActionEntity.prototype, "actionId", void 0);
exports.PolicyActionEntity = PolicyActionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'policy_action' })
], PolicyActionEntity);
//# sourceMappingURL=PolicyActionEntity.js.map