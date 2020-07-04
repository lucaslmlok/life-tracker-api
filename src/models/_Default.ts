import { DataTypes, ModelAttributes } from "sequelize";

import { STATUS_ACTIVE } from "../util/identifiers";

const Default: ModelAttributes = {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: STATUS_ACTIVE,
  },
};

export default Default;
