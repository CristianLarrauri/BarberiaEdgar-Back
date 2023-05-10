const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Shifts", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  });
};
