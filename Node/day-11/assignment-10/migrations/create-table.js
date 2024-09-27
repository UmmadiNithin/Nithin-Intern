const { sequelize } = require('../config/database'); 
const Student = require('../models/Student');
const Department = require('../models/Department');

const createTables = async () => {
  try {
    console.log('Starting the table creation process...');

    console.log('Synchronizing models with the database...');
    await sequelize.sync({ force: true });

    console.log('Tables created successfully:');
    console.log(`- ${Student.getTableName()} (Students Enrollment)`);
    console.log(`- ${Department.getTableName()} (Department)`);
  } catch (error) {
    console.error('Error occurred during table creation:', error);
  } finally {
    console.log('Table creation process completed.');
  }
};

createTables().catch((error) => {
  console.error('Unhandled error during table creation:', error);
});
