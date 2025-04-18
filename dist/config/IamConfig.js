"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getEnv_1 = require("../lib/utils/getEnv");
exports.default = () => ({
    iam: {
        activateUserUrl: (0, getEnv_1.default)('ACTIVATE_USER_URL'),
        activateUserTokenExpiresIn: Number((0, getEnv_1.default)('ACTIVATE_USER_TOKEN_EXPIRES_IN', { isOptional: true })) ??
            60 * 60 * 24, // 1 day
        passwordSecret: (0, getEnv_1.default)('PASSWORD_SECRET'),
        jwtAccessTokenSecret: (0, getEnv_1.default)('JWT_ACCESS_TOKEN_SECRET', { isOptional: true }) ??
            (0, getEnv_1.default)('PASSWORD_SECRET'), // Fallback to PASSWORD_SECRET if not provided
        jwtAccessTokenExpiresIn: Number((0, getEnv_1.default)('JWT_ACCESS_TOKEN_EXPIRES_IN', { isOptional: true })) ??
            60 * 60, // 1 hour
        jwtRefreshTokenSecret: (0, getEnv_1.default)('JWT_REFRESH_TOKEN_SECRET', { isOptional: true }) ??
            (0, getEnv_1.default)('PASSWORD_SECRET'), // Fallback to PASSWORD_SECRET if not provided
        jwtRefreshTokenExpiresIn: Number((0, getEnv_1.default)('JWT_REFRESH_TOKEN_EXPIRES_IN', { isOptional: true })) ??
            60 * 60 * 24, // 1 day
    },
});
//# sourceMappingURL=IamConfig.js.map