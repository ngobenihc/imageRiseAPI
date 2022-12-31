"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.norPageFound404 = void 0;
// this will show if the page is not loaded
var norPageFound404 = function (req, res) {
    res.status(404);
    res.render('pageNotFound');
};
exports.norPageFound404 = norPageFound404;
//# sourceMappingURL=noImage.middleware.js.map