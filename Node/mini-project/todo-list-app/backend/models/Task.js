const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('pending', 'completed'), defaultValue: 'pending' },
    dueDate: { type: DataTypes.DATE },
    priority: { type: DataTypes.ENUM('low', 'medium', 'high'), defaultValue: 'medium' },
    isPinned: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

module.exports = Task;
