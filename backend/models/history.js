// models/history.js
module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      laporanId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      activity: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    History.associate = (models) => {
      History.belongsTo(models.User, { foreignKey: 'userId' });
      History.belongsTo(models.LaporanPembayaran, { foreignKey: 'laporanId' });
    };
  
    return History;
  };
  