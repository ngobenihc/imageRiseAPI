"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = __importDefault(require("fs"));
function image_Resize(inputPath, outputPath, format, width, height) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            var readStream = fs_1.default.createReadStream(inputPath);
            var writeStream = fs_1.default.createWriteStream(outputPath);
            writeStream.on('error', function () { return console.log('Error!'); });
            writeStream.on('close', function () { return console.log('Image saved'); });
            var displayTrasformed = (0, sharp_1.default)();
            if (format === 'jpeg' || format === 'png' || format === 'jpg') {
                displayTrasformed = displayTrasformed.toFormat(format);
            }
            displayTrasformed = displayTrasformed
                .resize(width, height)
                .on('info', function () { return console.log('Image Resized..'); });
            readStream.pipe(displayTrasformed).pipe(writeStream);
            resolve('slow');
        }, 1000);
    });
}
exports.default = image_Resize;
//# sourceMappingURL=imageResize.js.map