"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const express_1 = require("express");
const resize_1 = __importDefault(require("../img-processing/resize"));
const util_1 = __importDefault(require("../util"));
const apiRouter = (0, express_1.Router)();
apiRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.query).length === 0) {
        res.status(200);
        res.send('Welcome to the API. Required params: filename, width, height.');
    }
    else if (!('filename' in req.query)) {
        res.status(400);
        res.send('"filename" query param missing from URL.');
    }
    else if (!('width' in req.query)) {
        res.status(400);
        res.send('"width" query param missing from URL.');
    }
    else if (!('height' in req.query)) {
        res.status(400);
        res.send('"height" query param missing from URL.');
    }
    else {
        const filename = req.query.filename;
        const inputPath = path_1.default.join(__dirname, '..', 'full', filename);
        if (yield (0, util_1.default)(inputPath)) {
            const [filenameNoExt, ext] = filename.split('.');
            const widthStr = req.query.width;
            const width = parseInt(widthStr, 10);
            const heightStr = req.query.height;
            const height = parseInt(heightStr, 10);
            if (Number.isNaN(width) || width <= 0) {
                res.status(400);
                res.send(`Invalid "width" value "${widthStr}"`);
            }
            else if (Number.isNaN(height) || height <= 0) {
                res.status(400);
                res.send(`Invalid "height" value "${heightStr}"`);
            }
            else {
                const outputPath = path_1.default.join(__dirname, '..', 'thumb', `${filenameNoExt}_${width}_${height}.${ext}`);
                // Resize image first if file doesn't exist
                if (!(yield (0, util_1.default)(outputPath))) {
                    // Create the output file's parent directory
                    yield fs_1.promises.mkdir(path_1.default.dirname(outputPath), {
                        recursive: true
                    });
                    // Resize the image
                    yield (0, resize_1.default)(inputPath, outputPath, width, height);
                }
                // Send the resized image in the response
                res.status(200);
                res.sendFile(outputPath, (err) => {
                    if (err) {
                        res.status(400);
                        res.send(`An error occurred while sending "${outputPath}".`);
                    }
                });
            }
        }
        else {
            res.status(404);
            res.send(`File not found "${inputPath}".`);
        }
    }
}));
exports.default = apiRouter;
