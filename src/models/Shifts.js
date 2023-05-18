const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Shifts",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
