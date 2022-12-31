import sharp from 'sharp';
import fs from 'fs';

export default function image_Resize(
  inputPath: string,
  outputPath: string,
  format: string,
  width: number | null,
  height: number | null
): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const readStream: fs.ReadStream = fs.createReadStream(inputPath);
      const writeStream: fs.WriteStream = fs.createWriteStream(outputPath);

      writeStream.on('error', () => console.log('Error!'));
      writeStream.on('close', () => console.log('Image saved'));

      let displayTrasformed: sharp.Sharp = sharp();
      if (format === 'jpeg' || format === 'png' || format === 'jpg') {
        displayTrasformed = displayTrasformed.toFormat(format);
      }

      displayTrasformed = displayTrasformed
        .resize(width, height)
        .on('info', () => console.log('Image Resized..'));

      readStream.pipe(displayTrasformed).pipe(writeStream);
      resolve('slow');
    }, 1000);
  });
}
