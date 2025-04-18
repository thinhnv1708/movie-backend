"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 0] = "SUCCESS";
    // 1xxx: General errors
    StatusCode[StatusCode["DATA_NOT_FOUND"] = 1000] = "DATA_NOT_FOUND";
    StatusCode[StatusCode["INVALID_PARAMETER"] = 1001] = "INVALID_PARAMETER";
    StatusCode[StatusCode["UNAUTHROIZED"] = 1002] = "UNAUTHROIZED";
    StatusCode[StatusCode["FORBIDDEN"] = 1003] = "FORBIDDEN";
    StatusCode[StatusCode["INVALID_REFRESH_TOKEN"] = 1004] = "INVALID_REFRESH_TOKEN";
    // 2xxx: IAM related errors
    StatusCode[StatusCode["EMAIL_ALREADY_EXISTS"] = 2000] = "EMAIL_ALREADY_EXISTS";
    StatusCode[StatusCode["SOME_POLICY_NOT_FOUND"] = 2001] = "SOME_POLICY_NOT_FOUND";
    StatusCode[StatusCode["SOME_ACTION_NOT_FOUND"] = 2002] = "SOME_ACTION_NOT_FOUND";
    StatusCode[StatusCode["USER_ALREADY_ACTIVATED"] = 2003] = "USER_ALREADY_ACTIVATED";
    StatusCode[StatusCode["CANNOT_MODIFY_DEFAULT_POLICY"] = 2004] = "CANNOT_MODIFY_DEFAULT_POLICY";
    StatusCode[StatusCode["USER_TOKEN_NOT_FOUND"] = 2005] = "USER_TOKEN_NOT_FOUND";
    StatusCode[StatusCode["USER_TOKEN_EXPIRED"] = 2006] = "USER_TOKEN_EXPIRED";
    StatusCode[StatusCode["USER_NOT_FOUND"] = 2007] = "USER_NOT_FOUND";
    StatusCode[StatusCode["INVALID_CREDENTIALS"] = 2008] = "INVALID_CREDENTIALS";
    StatusCode[StatusCode["USER_NOT_ACTIVATED"] = 2009] = "USER_NOT_ACTIVATED";
    //9xxx: Internal errors
    StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 9999] = "INTERNAL_SERVER_ERROR";
})(StatusCode || (StatusCode = {}));
exports.default = StatusCode;
//# sourceMappingURL=StatusCode.js.map