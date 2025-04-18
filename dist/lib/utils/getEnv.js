"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (key, options = {}) => {
    const { isOptional = false } = options;
    const value = process.env[key];
    if (!value && isOptional) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};
//# sourceMappingURL=getEnv.js.map