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

// Muat model User
db.User = require('./user')(sequelize, Sequelize);

module.exports = db;
