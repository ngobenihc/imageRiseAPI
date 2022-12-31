import fs from 'fs';
import {
  imagesPath,
  clearnFiles,
  createPictureSize,
  nameImagesTypes,
  
  
} from '../utils/utils';

interface imagesTypes {
  orginalSize: string[];
  inputFiles: string[];
  outputFiles: string[];
}

export const checkIfImagesExist = (
  width: number | null,
  height: number | null
): imagesTypes => {
  const orginalSize: string[] = [];
  const { inputPath, outputPath }: nameImagesTypes = imagesPath(__dirname);
  const outputFiles: string[] = fs.readdirSync(outputPath);
  let inputFiles: string[] = fs.readdirSync(inputPath);

  inputFiles = clearnFiles(inputFiles);

  inputFiles.forEach((file) => {
    const pictureSizeFile: string = createPictureSize(file, width, height);

    if (!outputFiles.includes(pictureSizeFile)) {
      orginalSize.push(file);
    }
  });
  return {
    orginalSize,
    inputFiles,
    outputFiles
  };
};
