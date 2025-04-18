"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageConverterPipe = void 0;
const contants_1 = require("../contants");
class PageConverterPipe {
    transform(data) {
        const page = Number(data);
        if (Number.isNaN(page) || page <= 0) {
            return contants_1.PAGE_DEFAULT;
        }
        return page;
    }
}
exports.PageConverterPipe = PageConverterPipe;
//# sourceMappingURL=PageConverterPipe.js.map