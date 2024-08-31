const Student = require('../models/Student');
const Department = require('../models/Department');

const updateStudent = async (studentId, updatedData) => {
  try {

    const student = await Student.findByPk(studentId, {
      include: [Department]
    });

    if (!student) throw new Error('Student not found');

    await student.update(updatedData);
    await student.reload({ include: [Department] });

    const data = {
      id: student.id,
      name: student.name,
      email: student.email,
      phone_no: student.phone_no,
      address: student.address,
      department: student.Department ? student.Department.name : null, 
    };

    console.log('Updated Student:', data);
    return data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error; 
  }
};
updateStudent(2, { phone_no: '987654321' }).catch(console.error);
