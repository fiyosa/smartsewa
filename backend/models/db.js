const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgresql://postgres:yourpassword@localhost:5432/smartsewa', 
  {
    dialect: 'postgres',
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Muat model 
db.User = require('./user')(sequelize, Sequelize);
db.LaporanPembayaran = require('./laporanPembayaran')(sequelize, Sequelize);
db.History = require('./history')(sequelize, Sequelize.DataTypes);

// Relasi 
db.User.hasMany(db.LaporanPembayaran, { foreignKey: 'userId' });
db.LaporanPembayaran.belongsTo(db.User, { foreignKey: 'userId' });
db.History.belongsTo(db.User, { foreignKey: 'userId' });
db.History.belongsTo(db.LaporanPembayaran, { foreignKey: 'laporanId' });
db.LaporanPembayaran.hasMany(db.History, { foreignKey: 'laporanId' });


//sinkronisasi model
sequelize.sync({ alter: true })  // 
  .then(() => {
    console.log('Database synced!');
  })
  .catch((err) => {
    console.error('Gagal sync database:', err);
  });

module.exports = db;
