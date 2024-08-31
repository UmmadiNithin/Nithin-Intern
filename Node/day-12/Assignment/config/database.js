const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('nithin', 'postgres', 'JVNPP143', {
  host: 'localhost',
  dialect: 'postgres',
  logging:false,
});

module.exports = sequelize;
