"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfImagesExist = void 0;
var fs_1 = __importDefault(require("fs"));
var utils_1 = require("../utils/utils");
var checkIfImagesExist = function (width, height) {
    var orginalSize = [];
    var _a = (0, utils_1.imagesPath)(__dirname), inputPath = _a.inputPath, outputPath = _a.outputPath;
    var outputFiles = fs_1.default.readdirSync(outputPath);
    var inputFiles = fs_1.default.readdirSync(inputPath);
    inputFiles = (0, utils_1.clearnFiles)(inputFiles);
    inputFiles.forEach(function (file) {
        var pictureSizeFile = (0, utils_1.createPictureSize)(file, width, height);
        if (!outputFiles.includes(pictureSizeFile)) {
            orginalSize.push(file);
        }
    });
    return {
        orginalSize: orginalSize,
        inputFiles: inputFiles,
        outputFiles: outputFiles
    };
};
exports.checkIfImagesExist = checkIfImagesExist;
//# sourceMappingURL=imagesTypes.js.map