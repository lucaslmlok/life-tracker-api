import { Sequelize } from "sequelize";

import { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } from "./config";

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  logging: false,
  timezone: "+08:00",
});

export default sequelize;
