const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

// Define the Task model
const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    status: { 
        type: DataTypes.ENUM('TODO', 'IN_PROGRESS', 'DONE'), 
        defaultValue: 'TODO' 
    },
    dueDate: { type: DataTypes.DATE },
    priority: { 
        type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'), 
        defaultValue: 'MEDIUM' 
    },
    isPinned: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Set up associations
Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

module.exports = Task;
