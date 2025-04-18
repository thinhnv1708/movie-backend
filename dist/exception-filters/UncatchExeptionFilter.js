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
exports.UncatchExeptionFilter = void 0;
const common_1 = require("@nestjs/common");
const HttpStatusMapping_1 = require("../lib/HttpStatusMapping");
const ResponseDataBuilder_1 = require("../lib/ResponseDataBuilder");
const StatusCode_1 = require("../lib/StatusCode");
const MessageMapping_1 = require("../lib/MessageMapping");
let UncatchExeptionFilter = class UncatchExeptionFilter {
    constructor() { }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = StatusCode_1.default.INTERNAL_SERVER_ERROR;
        const httpStatus = HttpStatusMapping_1.default[statusCode];
        console.error(exception);
        const responseData = new ResponseDataBuilder_1.default()
            .withStatusCode(statusCode)
            .withMessage(MessageMapping_1.default[statusCode])
            .build();
        response.status(httpStatus).json(responseData);
    }
};
exports.UncatchExeptionFilter = UncatchExeptionFilter;
exports.UncatchExeptionFilter = UncatchExeptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [])
], UncatchExeptionFilter);
//# sourceMappingURL=UncatchExeptionFilter.js.map