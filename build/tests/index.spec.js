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
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const __1 = __importDefault(require(".."));
const resize_1 = __importDefault(require("../img-processing/resize"));
const util_1 = __importDefault(require("../util"));
describe('GET /api', () => {
    const request = (0, supertest_1.default)(__1.default);
    it('Expect GET /api to return 200; Welcome', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
        expect(response.text.startsWith('Welcome to the API.')).toBeTrue();
    }));
    it('Expect GET /api?filename=fjord.jpg to return 400; missing width', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api?filename=fjord.jpg');
        expect(response.status).toBe(400);
        expect(response.text.startsWith('"width" query param missing')).toBeTrue();
    }));
    it('Expect GET /api?filename=fjord.jpg&width=400 to return 400; missing height', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api?filename=fjord.jpg&width=400');
        expect(response.status).toBe(400);
        expect(response.text.startsWith('"height" query param missing')).toBeTrue();
    }));
    it('Expect GET /api?filename=fjord.jpg&width=400&height=400 to return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api?filename=fjord.jpg&width=400&height=400');
        expect(response.status).toBe(200);
    }));
    it('Expect GET /api?filename=invalid.jpg&width=400&height=400 to return 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api?filename=invalid.jpg&width=400&height=400');
        expect(response.status).toBe(404);
    }));
});
describe('Resize image', () => __awaiter(void 0, void 0, void 0, function* () {
    const inputPath = path_1.default.join(__dirname, '..', 'full', 'fjord.jpg');
    const outputPath = path_1.default.join(__dirname, '..', 'thumb', 'fjord_test_out.jpg');
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Remove the file first if it exists
        if (yield (0, util_1.default)(outputPath))
            yield fs_1.promises.unlink(outputPath);
        else
            yield fs_1.promises.mkdir(path_1.default.dirname(outputPath), { recursive: true });
    }));
    it('Resize full/fjord.jpg to 400x400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, resize_1.default)(inputPath, outputPath, 400, 400);
        yield expectAsync(fs_1.promises.access(outputPath)).toBeResolved();
        const metadata = yield (0, sharp_1.default)(outputPath).metadata();
        expect(metadata.width).toBe(400);
        expect(metadata.height).toBe(400);
    }));
}));
