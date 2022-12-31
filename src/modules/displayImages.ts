import fs from 'fs';

export const displayImages = (
  width: number | null,
  height: number | null,
  outputPath: string
): string[] => {
  const sizePiture = `_${width}_${height}`;
  const outputFiles: string[] = fs.readdirSync(outputPath);

  return outputFiles.filter(
    (file) =>
      sizePiture === file.substring(file.indexOf('_'), file.indexOf('.'))
  );
};
