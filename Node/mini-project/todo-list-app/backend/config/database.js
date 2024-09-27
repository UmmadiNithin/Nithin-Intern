const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tododb', 'postgres', 'JVNPP143', {
    host: 'localhost',
    dialect: 'postgres',
    logging:false,
});

module.exports = sequelize;
