"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatusCode_1 = require("./StatusCode");
const HttpStatus_1 = require("./HttpStatus");
exports.default = {
    [StatusCode_1.default.SUCCESS]: HttpStatus_1.default.SUCCESS,
    [StatusCode_1.default.DATA_NOT_FOUND]: HttpStatus_1.default.NOT_FOUND,
    [StatusCode_1.default.INVALID_PARAMETER]: HttpStatus_1.default.BAD_REQUEST,
    [StatusCode_1.default.INTERNAL_SERVER_ERROR]: HttpStatus_1.default.INTERNAL_SERVER_ERROR,
};
//# sourceMappingURL=HttpStatusMapping.js.map