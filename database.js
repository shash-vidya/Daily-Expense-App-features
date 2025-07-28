const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('final', 'root', 'Shashvraj21!', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
