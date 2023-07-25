const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Users",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: true,
      },
      ban: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      admin: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
