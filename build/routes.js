"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var Controller_1_1 = require("routesControllers/Controller_1");
var ResizeController_1 = require("routesControllers/ResizeController");
var _routes = [
    ['/', Controller_1_1.IndexController],
    ['/', ResizeController_1.RouterResize],
];
var routes = function (app) {
    _routes.forEach(function (route) {
        var url = route[0], controller = route[1];
        app.use(url, controller);
    });
};
exports.routes = routes;
//# sourceMappingURL=routes.js.map