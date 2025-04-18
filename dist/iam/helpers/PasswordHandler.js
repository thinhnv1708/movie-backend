"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHandler = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let PasswordHandler = class PasswordHandler {
    hash(password, secret) {
        const hash = crypto.createHmac('sha256', secret);
        hash.update(password);
        return hash.digest('hex');
    }
    verify(password, hashedPassword, secret) {
        const hash = this.hash(password, secret);
        return hash === hashedPassword;
    }
};
exports.PasswordHandler = PasswordHandler;
exports.PasswordHandler = PasswordHandler = __decorate([
    (0, common_1.Injectable)()
], PasswordHandler);
//# sourceMappingURL=PasswordHandler.js.map