const { Sequelize } = require('sequelize');

// Database configuration
const sequelize = new Sequelize('postgres', 'postgres', 'JVNPP143', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  define: {
    schema: 'student_management_2', 
  },
});

console.log('Sequelize instance initialized with the following configuration:');
console.log(`Database: ${sequelize.config.database}`);
console.log(`Username: ${sequelize.config.username}`);
console.log(`Host: ${sequelize.config.host}`);
console.log(`Dialect: ${sequelize.options.dialect}`);
console.log(`Logging: ${sequelize.options.logging}`);

// Test 
const testConnection = async () => {
  console.log('Attempting to authenticate with the database...');
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};


module.exports = {
  sequelize,
  testConnection,
};

testConnection();
