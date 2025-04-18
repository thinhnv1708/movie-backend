"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BusinessError extends Error {
    constructor(statusCode, message) {
        super(`${statusCode}: ${message}`);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.default = BusinessError;
//# sourceMappingURL=BusinessError.js.map