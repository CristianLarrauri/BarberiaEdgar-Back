const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Barbers_Shifts",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      occupied: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
