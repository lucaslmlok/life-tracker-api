"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const sequelize = new sequelize_1.Sequelize(config_1.DB_DATABASE, config_1.DB_USERNAME, config_1.DB_PASSWORD, {
    dialect: "mysql",
    host: config_1.DB_HOST,
    logging: false,
    timezone: "+08:00",
});
exports.default = sequelize;
