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
exports.checkToken = exports.login = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const config_1 = require("../util/config");
const messages_1 = require("../util/messages");
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        email: user.get("email"),
        userId: user.get("id"),
    }, config_1.JWT_SECRET);
};
exports.signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error(messages_1.signupMsg.validateFail);
            error["statusCode"] = 422;
            error["data"] = errors.array();
            throw error;
        }
        const { email, password, name } = req.body;
        const hashedPwd = yield bcryptjs_1.default.hash(password, 12);
        const user = yield User_1.default.create({
            email,
            password: hashedPwd,
            name,
        });
        const token = generateToken(user);
        res.status(201).json({
            message: messages_1.signupMsg.success,
            userId: user.get("id"),
            token,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            const error = new Error(messages_1.generalMsg.wrongStructure);
            error["statusCode"] = 400;
            throw error;
        }
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user) {
            const error = new Error(messages_1.loginMsg.noUser);
            error["statusCode"] = 401;
            throw error;
        }
        const pwdEqual = yield bcryptjs_1.default.compare(password, user.get("password"));
        if (!pwdEqual) {
            const error = new Error(messages_1.loginMsg.wrongPwd);
            error["statusCode"] = 401;
            throw error;
        }
        const token = generateToken(user);
        res.status(200).json({
            message: messages_1.loginMsg.success,
            userId: user.get("id"),
            token,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.checkToken = (req, res, next) => {
    res.status(200).json({
        message: messages_1.generalMsg.success,
        userId: req["userId"],
    });
};
