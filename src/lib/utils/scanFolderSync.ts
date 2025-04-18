import * as fs from 'fs';

export default <T = any>(folderPath: string): T[] => {
  let fileNames = fs.readdirSync(folderPath);

  fileNames = fileNames.filter(
    (fileName) => fileName.endsWith('.js') || fileName.endsWith('.ts'),
  );

  const contents = fileNames.map((fileName) => {
    const filePath = `${folderPath}/${fileName}`;
    const content = require(filePath);

    return Object.values(content);
  });

  return contents.flatMap((item) => item) as T[];
};
