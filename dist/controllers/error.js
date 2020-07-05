"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const messages_1 = require("../util/messages");
exports.errorHandler = (error, req, res, next) => {
    let { statusCode, message, data } = error;
    if (!statusCode)
        statusCode = 500;
    if (!message && statusCode === 500)
        message = messages_1.generalMsg.serverErr;
    res.status(statusCode).json({ message, data });
};
