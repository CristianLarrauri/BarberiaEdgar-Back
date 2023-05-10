const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Barbers", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hours: {
      type: DataTypes.STRING,
    },
  });
};
