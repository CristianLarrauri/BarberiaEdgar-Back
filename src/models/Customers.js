const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Customers", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
