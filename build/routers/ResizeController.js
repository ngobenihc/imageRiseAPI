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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterResize = void 0;
var express_1 = __importDefault(require("express"));
var imagesTypes_1 = require("modules/imagesTypes");
var path_1 = __importDefault(require("path"));
var utils_1 = require("../utils/utils");
var imageResize_1 = __importDefault(require("modules/imageResize"));
var displayImages_1 = require("modules/displayImages");
exports.RouterResize = express_1.default.Router();
exports.RouterResize.get('/resize', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, high, wid, width, height, _b, inputPath, outputPath, isValue, isImages, imageDisplay, orginalSize, len, format, _i, orginalSize_1, file, inputImage, thumbnailFile, thumbnailFilePath, e_1, lenImageDisplay;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, high = _a.high, wid = _a.wid;
                width = wid ? parseInt(wid, 10) : null;
                height = high ? parseInt(high, 10) : null;
                _b = (0, utils_1.imagesPath)(__dirname), inputPath = _b.inputPath, outputPath = _b.outputPath;
                isValue = false;
                isImages = false;
                imageDisplay = [];
                if (!(width === null && height === null)) return [3 /*break*/, 1];
                isValue = true;
                return [3 /*break*/, 9];
            case 1:
                orginalSize = (0, imagesTypes_1.checkIfImagesExist)(width, height).orginalSize;
                len = orginalSize.length;
                if (!(len > 0)) return [3 /*break*/, 8];
                _c.label = 2;
            case 2:
                _c.trys.push([2, 7, , 8]);
                format = 'jpeg' || 'png' || 'jpg';
                _i = 0, orginalSize_1 = orginalSize;
                _c.label = 3;
            case 3:
                if (!(_i < orginalSize_1.length)) return [3 /*break*/, 6];
                file = orginalSize_1[_i];
                inputImage = path_1.default.join(inputPath, file);
                thumbnailFile = (0, utils_1.createPictureSize)(file, width, height);
                thumbnailFilePath = path_1.default.join(outputPath, thumbnailFile);
                return [4 /*yield*/, (0, imageResize_1.default)(inputImage, thumbnailFilePath, format, width, height)];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 8];
            case 7:
                e_1 = _c.sent();
                // the error part if the picture is missing something
                console.log('Error occured');
                return [3 /*break*/, 8];
            case 8:
                imageDisplay = (0, displayImages_1.displayImages)(width, height, outputPath);
                lenImageDisplay = imageDisplay.length;
                // const len = orginalSize.length;
                if (len < 1 && lenImageDisplay < 1) {
                    isImages = true;
                }
                _c.label = 9;
            case 9: return [4 /*yield*/, new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve('wait before display picture');
                    }, 1000);
                })];
            case 10:
                _c.sent();
                res.render('resize', {
                    data: imageDisplay,
                    isValue: isValue,
                    isImages: isImages,
                    width: width,
                    height: height
                });
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=ResizeController.js.map