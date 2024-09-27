const fs = require('fs');
const path = require('path');
const Student = require('../models/Student');
const Department = require('../models/Department');

const exportStudents = async () => {
  try {
    const students = await Student.findAll({
      include: [Department]
    });

    const data = students.map(student => ({
      id: student.id,
      name: student.name,
      email: student.email,
      phone_no: student.phone_no,
      address: student.address,
      department: student.Department ? student.Department.name : null,
    }));

    const dirPath = path.join(__dirname, 'data');
    const filePath = path.join(dirPath, 'students.json');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('Students data exported to JSON file');
  } catch (error) {
    console.error('Error exporting students data:', error);
  }
};

exportStudents().catch(console.error);
