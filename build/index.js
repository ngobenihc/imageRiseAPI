"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routesController_1 = __importDefault(require("./routesController"));
const port = 8086;
const host = 'localhost';
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use('/', routesController_1.default);
app.listen(port, host, () => {
    // /api?filename=fjord.jpg&width=400&height=400
    console.log(`Server is running at http://${host}:${port}`);
});
exports.default = app;
