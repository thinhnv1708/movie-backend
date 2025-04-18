"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.default = async (folderPath) => {
    let fileNames = await fs.readdirSync(folderPath);
    fileNames = fileNames.filter((fileName) => fileName.endsWith('.js') || fileName.endsWith('.ts'));
    const contents = await Promise.all(fileNames.map(async (fileName) => {
        const filePath = `${folderPath}/${fileName}`;
        const content = await Promise.resolve(`${filePath}`).then(s => require(s));
        return Object.values(content);
    }));
    return contents.flatMap((item) => item);
};
//# sourceMappingURL=scanFolder.js.map