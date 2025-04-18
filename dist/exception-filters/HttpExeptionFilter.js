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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const BusinessError_1 = require("../lib/BusinessError");
const HttpStatusMapping_1 = require("../lib/HttpStatusMapping");
const ResponseDataBuilder_1 = require("../lib/ResponseDataBuilder");
const HttpStatus_1 = require("../lib/HttpStatus");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor() { }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = exception.statusCode;
        const httpStatus = HttpStatusMapping_1.default[statusCode] || HttpStatus_1.default.BAD_REQUEST;
        const responseData = new ResponseDataBuilder_1.default()
            .withStatusCode(statusCode)
            .withMessage(exception.message)
            .build();
        response.status(httpStatus).json(responseData);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(BusinessError_1.default),
    __metadata("design:paramtypes", [])
], HttpExceptionFilter);
//# sourceMappingURL=HttpExeptionFilter.js.map