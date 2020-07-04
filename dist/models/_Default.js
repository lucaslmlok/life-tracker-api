"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const identifiers_1 = require("../util/identifiers");
const Default = {
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: identifiers_1.STATUS_ACTIVE,
    },
};
exports.default = Default;
