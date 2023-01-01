
import express from 'express';
import path from 'path';

import {
  checkFileExists,
  insistDirectoryExists,
  resizeFile
} from '../middleware/filesPic';

const routes = express.Router();

routes.get(
  '/',
  async (req, res): Promise<void> => {
    const filename = req.query.f as string;
    const extension = req.query.x as string;
    const width = req.query.w as string;
    const height = req.query.h as string;

  
    if (
      filename === undefined ||
      extension === undefined ||
      width === undefined ||
      height === undefined
    ) {
      // invalid request query parameters
      res.status(400).send('enter one of the following 1. encenadaport&x=jpeg&w=100&h=100, 2 fjordt&x=jpeg&w=100&h=100, 3 icelandwaterfall&x=jpeg&w=100&h=100, 4 palmtunnel&x=jpeg&w=100&h=100, 5 santamonica&x=jpeg&w=100&h=100, 6 ana&x=jpeg&w=100&h=100');
    } else {
      
      const w = parseInt(width) as number;
      const h = parseInt(height) as number;
      if (isNaN(w) || isNaN(h)) {
        res.status(400).send('Invalid input');
      } else {
        
        const extensionLowercase = extension.toLowerCase();
        const assetResourceName =
          path.join(__dirname, '../../assets/full/') +
          filename +
          '.' +
          extensionLowercase;
        const thumbnailDirectory = path.join(
          __dirname,
          '../../assets/thumbnail/'
        );
        const thumbnailResourceName =
          thumbnailDirectory +
          filename +
          '-' +
          width +
          'w-' +
          height +
          'h.' +
          extensionLowercase;

  
        const assetExists = await checkFileExists(assetResourceName);
        if (assetExists) {
        
          insistDirectoryExists(thumbnailDirectory);

          
          resizeFile(
            assetResourceName,
            parseInt(width),
            parseInt(height),
            thumbnailResourceName
          ).then((outputFileName) => {
            console.log('file returned: ' + outputFileName);
            res.status(200).sendFile(outputFileName);
          });
        } else {
          
          res.status(404).send('Cannot find the page.');
        }
      }
    }
  }
);

export default routes;
