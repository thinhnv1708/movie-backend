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
exports.FeatureEntity = void 0;
const typeorm_1 = require("typeorm");
const PolicyEntity_1 = require("./PolicyEntity");
let FeatureEntity = class FeatureEntity {
};
exports.FeatureEntity = FeatureEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], FeatureEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id' }),
    __metadata("design:type", String)
], FeatureEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FeatureEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FeatureEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FeatureEntity.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at', nullable: true }),
    __metadata("design:type", Number)
], FeatureEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at', nullable: true }),
    __metadata("design:type", Number)
], FeatureEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => PolicyEntity_1.PolicyEntity, (policy) => policy.actions),
    __metadata("design:type", Array)
], FeatureEntity.prototype, "policies", void 0);
exports.FeatureEntity = FeatureEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'feature' })
], FeatureEntity);
//# sourceMappingURL=FeatureEntity.js.map