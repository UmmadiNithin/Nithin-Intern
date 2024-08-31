const fs = require('fs');
const path = require('path');
const Student = require('../models/Student');
const Department = require('../models/Department');


const deleteStudent = async (studentId) => {
  try {
    
    const student = await Student.findByPk(studentId, {
      include: [Department] 
    });

    if (!student) throw new Error('Student not found');

    const data = {
      id: student.id,
      name: student.name,
      email: student.email,
      phone_no: student.phone_no,
      address: student.address,
      department: student.Department ? student.Department.name : null, 
    };

    
    await student.destroy();

    const dirPath = path.join(__dirname, 'data');
    const filePath = path.join(dirPath, 'deleted.json');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('Deleted student data exported to JSON file');
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};
deleteStudent(6).catch(console.error);
