const { Sequelize, DataTypes } = require('sequelize');

// Directly create a new Sequelize instance
const sequelize = new Sequelize('dharanish', 'postgres', '1234567', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  define: {
    schema: 'student_management_2',
  },
});

// Define a model directly in this script
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
});

const testModel = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    // Sync the model to create the table
    await sequelize.sync({ force: true });
    console.log('Department table created successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
};

testModel();
