const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Task = require('./Task');

const Collaborator = sequelize.define('Collaborator', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    taskId: { type: DataTypes.INTEGER, allowNull: false }
});

Collaborator.belongsTo(User, { foreignKey: 'userId' });
Collaborator.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = Collaborator;
