"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.default = (folderPath) => {
    let fileNames = fs.readdirSync(folderPath);
    fileNames = fileNames.filter((fileName) => fileName.endsWith('.js') || fileName.endsWith('.ts'));
    const contents = fileNames.map((fileName) => {
        const filePath = `${folderPath}/${fileName}`;
        const content = require(filePath);
        return Object.values(content);
    });
    return contents.flatMap((item) => item);
};
//# sourceMappingURL=scanFolderSync.js.map