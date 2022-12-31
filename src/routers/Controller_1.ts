import fs from 'fs';

import express from 'express';


import { imagesPath, clearnFiles, nameImagesTypes } from '../utils/utils';

export const IndexController= express.Router();
const { inputPath }: nameImagesTypes = imagesPath(__dirname);

IndexController.get(
  '/',
  async (req, res) => {
    let inputFiles: string[] = fs.readdirSync(inputPath);
    inputFiles = clearnFiles(inputFiles);
    res.status(200);
    res.render('index', {
      data: inputFiles
    });
  }
);