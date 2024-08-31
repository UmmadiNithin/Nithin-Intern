const Department = require('../models/Department');

const addDepartments = async () => {
  try {
        const departments = [
      { name: 'Computer Science', institution: 'Tech University' },
      { name: 'Mathematics', institution: 'Tech University' },
      { name: 'Physics', institution: 'Science College' },
      { name: 'Chemistry', institution: 'Science College' },
      { name: 'Biology', institution: 'Bio Institute' },
      
    ];

    await Department.bulkCreate(departments);
    console.log('Departments added successfully');
  } catch (error) {
    console.error('Error adding departments:', error);
  }
};

addDepartments().catch(console.error);
