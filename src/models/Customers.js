const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Customers",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      services: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
