"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitConverterPipe = void 0;
const contants_1 = require("../contants");
class LimitConverterPipe {
    transform(data) {
        const limit = Number(data);
        if (Number.isNaN(limit) || limit <= 0) {
            return contants_1.LIMIT_DEFAULT;
        }
        return limit;
    }
}
exports.LimitConverterPipe = LimitConverterPipe;
//# sourceMappingURL=LimitConverterPipe.js.map