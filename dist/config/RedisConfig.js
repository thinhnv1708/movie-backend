"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getEnv_1 = require("../lib/utils/getEnv");
exports.default = () => {
    return {
        redis: {
            url: (0, getEnv_1.default)('REDIS_URL'),
        },
    };
};
//# sourceMappingURL=RedisConfig.js.map