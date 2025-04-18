"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getEnv_1 = require("../lib/utils/getEnv");
exports.default = () => ({
    postgre: {
        url: (0, getEnv_1.default)('POSTGRES_URL'),
    },
});
//# sourceMappingURL=PostgreConfig.js.map