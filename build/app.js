"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var routes_1 = require("./routes");
var logger_1 = require("./middleware/logger");
var noImage_middleware_1 = require("middleware/noImage.middleware");
exports.app = (0, express_1.default)();
exports.app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
exports.app.set('HTML', path_1.default.resolve(__dirname, 'HTML'));
exports.app.set('HTML engine', 'ejs');
exports.app.use(logger_1.morganMiddleware);
(0, routes_1.routes)(exports.app);
exports.app.use(noImage_middleware_1.norPageFound404);
//# sourceMappingURL=app.js.map