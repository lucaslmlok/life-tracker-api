"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messages_1 = require("../util/messages");
const config_1 = require("../util/config");
exports.isAuth = (req, res, next) => {
    const token = req.get("Authorization");
    if (!token) {
        const error = new Error(messages_1.generalMsg.noAuth);
        error["statusCode"] = 401;
        throw error;
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    }
    catch (error) {
        error["statusCode"] = 500;
        throw error;
    }
    if (!decodedToken) {
        const error = new Error(messages_1.generalMsg.noAuth);
        error["statusCode"] = 401;
        throw error;
    }
    req["userId"] = decodedToken.userId;
    next();
};
