const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  schema: 'student_management_2', 
  tableName: 'Departments',
});

module.exports = Department;
