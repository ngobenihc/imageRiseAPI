"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = void 0;
var morgan_1 = __importDefault(require("morgan"));
/***
         * Shorter than default, also including response time.
         * :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
         
         */
exports.morganMiddleware = (0, morgan_1.default)('short');
//# sourceMappingURL=logger.js.map