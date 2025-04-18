"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageMapping_1 = require("./MessageMapping");
const StatusCode_1 = require("./StatusCode");
class ResponseDataBuilder {
    constructor() {
        this.statusCode = StatusCode_1.default.SUCCESS;
    }
    withStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    withMessage(message) {
        this.message = message;
        return this;
    }
    withData(data) {
        this.data = data;
        return this;
    }
    build() {
        return {
            statusCode: this.statusCode,
            message: this.message || MessageMapping_1.default[this.statusCode],
            data: this.data,
        };
    }
}
exports.default = ResponseDataBuilder;
//# sourceMappingURL=ResponseDataBuilder.js.map