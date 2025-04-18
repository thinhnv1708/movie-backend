"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executePromise = void 0;
const executePromise = (promise) => {
    return promise
        .then((data) => [null, data])
        .catch((err) => [err, null]);
};
exports.executePromise = executePromise;
//# sourceMappingURL=executePromise.js.map