"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getEnv_1 = require("../lib/utils/getEnv");
exports.default = () => ({
    app: {
        port: Number((0, getEnv_1.default)('PORT', { isOptional: true })) || 3000,
    },
});
//# sourceMappingURL=AppConfig.js.map