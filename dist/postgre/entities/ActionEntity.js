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
exports.ActionEntity = void 0;
const typeorm_1 = require("typeorm");
const PolicyEntity_1 = require("./PolicyEntity");
const FeatureEntity_1 = require("./FeatureEntity");
let ActionEntity = class ActionEntity {
};
exports.ActionEntity = ActionEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ActionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'feature_id' }),
    __metadata("design:type", String)
], ActionEntity.prototype, "featureId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ActionEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ActionEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ActionEntity.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ActionEntity.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at', nullable: true }),
    __metadata("design:type", Number)
], ActionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at', nullable: true }),
    __metadata("design:type", Number)
], ActionEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => PolicyEntity_1.PolicyEntity, (policy) => policy.actions),
    __metadata("design:type", Array)
], ActionEntity.prototype, "policies", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => FeatureEntity_1.FeatureEntity),
    (0, typeorm_1.JoinColumn)({ name: 'feature_id' }),
    __metadata("design:type", FeatureEntity_1.FeatureEntity)
], ActionEntity.prototype, "feature", void 0);
exports.ActionEntity = ActionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'action' })
], ActionEntity);
//# sourceMappingURL=ActionEntity.js.map