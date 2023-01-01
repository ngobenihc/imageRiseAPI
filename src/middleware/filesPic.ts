import { promises as fsPromises } from 'fs';
import sharp from 'sharp';


const checkFileExists = async (fileResourceName: string): Promise<boolean> => {
  try {
    const fileVar = await fsPromises.open(fileResourceName, 'r');
    fileVar.close();
    return true;
  } catch (err) {
    return false;
  }
};


const insistDirectoryExists = async (
  directoryResourceName: string
): Promise<void> => {
  try {
    await fsPromises.readdir(directoryResourceName);
  } catch {
    await fsPromises.mkdir(directoryResourceName);
  }
  return Promise.resolve();
};


const resizeFile = async (
  inputFileName: string,
  width: number,
  height: number,
  outputFileName: string
): Promise<string> => {
  
  const outputFileExists = await checkFileExists(outputFileName);
  if (!outputFileExists) {
    
    console.log('Output file');
    await sharp(inputFileName).resize(width, height).toFile(outputFileName);
    return outputFileName;
  } else {
    console.log('file already exists');
    return outputFileName;
  }
};

export { checkFileExists, insistDirectoryExists, resizeFile };
