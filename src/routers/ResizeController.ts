import express from 'express';
import { checkIfImagesExist } from 'modules/imagesTypes';
import path from 'path';
import { imagesPath, clearnFiles, nameImagesTypes, createPictureSize } from '../utils/utils';
import image_Resize from 'modules/imageResize';
import { displayImages } from 'modules/displayImages';



interface imageResized {
  orginalSize: string[];
}

export const RouterResize = express.Router();

RouterResize.get(
  '/resize',
  async (req, res) => {
    const { high, wid } = req.query;
    const width: number | null = wid? parseInt(wid as string, 10) : null;
    const height: number | null = high ? parseInt(high as string, 10) : null;

    const { inputPath, outputPath }: nameImagesTypes = imagesPath(__dirname);

    let isValue: boolean = false;
    let isImages: boolean = false;
    let imageDisplay: string[] = [];

    if (width === null && height === null) {
      isValue = true;
    } else {
      const {orginalSize}: imageResized = checkIfImagesExist(width, height);

      const len = orginalSize.length;

      if (len > 0) {
        
        try {
          const format = 'jpeg' || 'png' || 'jpg';

          for (const file of orginalSize) {
            const inputImage: string = path.join(inputPath, file);
            const thumbnailFile: string = createPictureSize(
              file,
              width,
              height
            );
            const thumbnailFilePath: string = path.join(
              outputPath,
              thumbnailFile
            );

            await image_Resize(inputImage, thumbnailFilePath, format, width, height);
          }
        } catch (e) {

          // the error part if the picture is missing something

          console.log('Error occured');
        }
      }

      imageDisplay = displayImages(width, height, outputPath);
      //if no error occurred the picture will display
      const lenImageDisplay = imageDisplay.length;
      // const len = orginalSize.length;
      if (len < 1 && lenImageDisplay < 1) {
        isImages = true;
      }
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('wait before display picture');
      }, 1000);
    });

    res.render('resize', {
      data: imageDisplay,
      isValue,
      isImages,
      width,
      height
    });
  }
);