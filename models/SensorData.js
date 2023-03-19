const { DataTypes } = require("sequelize");
const db = require("../lib/db");

const SensorData = db.define(
  "sensordata",
  {
    MQ9_co: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  {
    indexes: [
      {
        fields: ["sensorId"],
      },
    ],
  }
);

if (process.env.NODE_ENV !== "production") {
  SensorData.sync({ force: true });
}

module.exports = SensorData;

