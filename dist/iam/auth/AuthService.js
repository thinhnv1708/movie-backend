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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const BusinessError_1 = require("../../lib/BusinessError");
const idGenerator_1 = require("../../lib/idGenerator");
const StatusCode_1 = require("../../lib/StatusCode");
const executePromise_1 = require("../../lib/utils/executePromise");
const PasswordHandler_1 = require("../../lib/helpers/PasswordHandler");
let AuthService = class AuthService {
    constructor(authRepo, jwtService, configService, passwordHandler, iatRepo) {
        this.authRepo = authRepo;
        this.jwtService = jwtService;
        this.configService = configService;
        this.passwordHandler = passwordHandler;
        this.iatRepo = iatRepo;
    }
    async login(email, password) {
        // Get user by email
        const user = await this.authRepo.getUserByEmail(email);
        if (!user) {
            throw new BusinessError_1.default(StatusCode_1.default.INVALID_CREDENTIALS);
        }
        // Check if user is activated
        if (!user.activated) {
            throw new BusinessError_1.default(StatusCode_1.default.USER_NOT_ACTIVATED);
        }
        // Verify password
        const iamConfig = this.configService.get('iam');
        const isPasswordValid = this.passwordHandler.verify(password, user.password, iamConfig.passwordSecret);
        if (!isPasswordValid) {
            throw new BusinessError_1.default(StatusCode_1.default.INVALID_CREDENTIALS);
        }
        // Generate tokens
        const tokens = await this.generateTokens({
            userId: user.id,
            isRoot: user.isRoot,
        });
        return tokens;
    }
    async refreshToken(refreshToken) {
        // Verify the refresh token
        const iamConfig = this.configService.get('iam');
        const [error, decoded] = await (0, executePromise_1.executePromise)(this.jwtService.verifyAsync(refreshToken, {
            secret: iamConfig.jwtRefreshTokenSecret,
        }));
        if (error) {
            throw new BusinessError_1.default(StatusCode_1.default.INVALID_REFRESH_TOKEN);
        }
        const iat = await this.iatRepo.getIat(decoded.userId);
        if (iat >= decoded.iat) {
            throw new BusinessError_1.default(StatusCode_1.default.INVALID_REFRESH_TOKEN);
        }
        // Generate new tokens
        const tokens = await this.generateTokens({
            userId: decoded.userId,
            isRoot: decoded.isRoot,
        });
        return tokens;
    }
    async generateTokens(payload) {
        const iamConfig = this.configService.get('iam');
        // Generate access token
        const accessTokenPayload = {
            jti: (0, idGenerator_1.default)(),
            ...payload,
        };
        const accessToken = this.jwtService.sign(accessTokenPayload, {
            secret: iamConfig.jwtAccessTokenSecret,
            expiresIn: iamConfig.jwtAccessTokenExpiresIn,
        });
        // Generate refresh token
        const refreshTokenPayload = {
            jti: (0, idGenerator_1.default)(),
            ...payload,
        };
        const refreshToken = this.jwtService.sign(refreshTokenPayload, {
            secret: iamConfig.jwtRefreshTokenSecret,
            expiresIn: iamConfig.jwtRefreshTokenExpiresIn,
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    async verifyToken(token) {
        const iamConfig = this.configService.get('iam');
        const [error, decoded] = await (0, executePromise_1.executePromise)(this.jwtService.verifyAsync(token, {
            secret: iamConfig.jwtAccessTokenSecret,
        }));
        if (error) {
            throw new BusinessError_1.default(StatusCode_1.default.UNAUTHROIZED);
        }
        const iat = await this.iatRepo.getIat(decoded.userId);
        if (iat >= decoded.iat) {
            throw new BusinessError_1.default(StatusCode_1.default.UNAUTHROIZED);
        }
        return decoded;
    }
    async checkPermission(userInfo, reqMethod, reqPath) {
        if (userInfo.isRoot) {
            return true;
        }
        console.log('userInfo', userInfo);
        const actions = await this.authRepo.getUserActions(userInfo.userId);
        reqMethod = reqMethod.toUpperCase();
        reqPath = reqPath.toLowerCase();
        for (const action of actions) {
            if (reqMethod !== action.method && action.method !== '*') {
                continue;
            }
            const actionPathRegex = this.getPathRegex(action.path);
            if (!actionPathRegex.test(reqPath)) {
                continue;
            }
            return true;
        }
        return false;
    }
    getPathRegex(path) {
        const pathComponents = path.split('/');
        for (let i = 0; i < pathComponents.length; i++) {
            const pathComponent = pathComponents[i];
            if (pathComponent === '*') {
                pathComponents[i] = '.*';
            }
            if (pathComponent === ':id') {
                pathComponents[i] = '[a-zA-Z0-9-_=]+';
            }
        }
        return new RegExp(`^${pathComponents.join('\/')}$`);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AuthRepo')),
    __param(4, (0, common_1.Inject)('IatRepo')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        config_1.ConfigService,
        PasswordHandler_1.PasswordHandler, Object])
], AuthService);
//# sourceMappingURL=AuthService.js.map