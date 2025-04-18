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
exports.PolicyEntity = void 0;
const typeorm_1 = require("typeorm");
const ActionEntity_1 = require("./ActionEntity");
let PolicyEntity = class PolicyEntity {
};
exports.PolicyEntity = PolicyEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], PolicyEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PolicyEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PolicyEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_default' }),
    __metadata("design:type", Boolean)
], PolicyEntity.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => ActionEntity_1.ActionEntity, (action) => action.policies),
    (0, typeorm_1.JoinTable)({
        name: 'policy_action',
        joinColumn: {
            name: 'policy_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'action_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], PolicyEntity.prototype, "actions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at', nullable: true }),
    __metadata("design:type", Number)
], PolicyEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at', nullable: true }),
    __metadata("design:type", Number)
], PolicyEntity.prototype, "updatedAt", void 0);
exports.PolicyEntity = PolicyEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'policy' })
], PolicyEntity);
//# sourceMappingURL=PolicyEntity.js.map