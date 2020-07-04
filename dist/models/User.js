"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../util/database"));
const _Default_1 = __importDefault(require("./_Default"));
const User = database_1.default.define("user", Object.assign({ id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }, email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }, password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }, name: sequelize_1.DataTypes.STRING }, _Default_1.default));
exports.default = User;
