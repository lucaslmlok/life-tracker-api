"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
exports.errorHandler = (error, req, res, next) => {
    const { statusCode, message, data } = error;
    res.status(statusCode || 500).json({ message, data });
};
