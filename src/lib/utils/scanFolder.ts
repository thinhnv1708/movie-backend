import * as fs from 'fs';

export default async <T = any>(folderPath: string): Promise<T[]> => {
  let fileNames = await fs.readdirSync(folderPath);

  fileNames = fileNames.filter(
    (fileName) => fileName.endsWith('.js') || fileName.endsWith('.ts'),
  );
  

  const contents = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = `${folderPath}/${fileName}`;
      const content = await import(filePath);

      return Object.values(content);
    }),
  );

  return contents.flatMap((item) => item) as T[];
};
