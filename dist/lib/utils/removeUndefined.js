"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUndefined = void 0;
const removeUndefined = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const result = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (value !== undefined) {
                result[key] =
                    typeof value === 'object' ? (0, exports.removeUndefined)(value) : value;
            }
        }
    }
    return result;
};
exports.removeUndefined = removeUndefined;
//# sourceMappingURL=removeUndefined.js.map