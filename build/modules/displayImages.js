"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayImages = void 0;
var fs_1 = __importDefault(require("fs"));
var displayImages = function (width, height, outputPath) {
    var sizePiture = "_".concat(width, "_").concat(height);
    var outputFiles = fs_1.default.readdirSync(outputPath);
    return outputFiles.filter(function (file) {
        return sizePiture === file.substring(file.indexOf('_'), file.indexOf('.'));
    });
};
exports.displayImages = displayImages;
//# sourceMappingURL=displayImages.js.map