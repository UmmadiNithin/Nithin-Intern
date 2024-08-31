const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

const Department = require('./Department'); 

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dept_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Departments', 
      key: 'id',
    },
  },
}, {
  schema: 'student_management_2',
});

Student.belongsTo(Department, { foreignKey: 'dept_id' });
Department.hasMany(Student, { foreignKey: 'dept_id' });

module.exports = Student;
