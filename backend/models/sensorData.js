// models/SensorData.js
module.exports = (sequelize, DataTypes) => {
  const SensorData = sequelize.define('SensorData', {
    deviceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kamar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    suhu: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    kelembapan: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    suara: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'sensor_data',
    timestamps: true, // auto createdAt & updatedAt
  });

  return SensorData;
};
