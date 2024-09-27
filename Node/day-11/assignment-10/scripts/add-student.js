
const Student = require('../models/Student');
const Department = require('../models/Department');

const addStudents = async () => {
  try {
  
    const departments = await Department.findAll();
    if (departments.length === 0) {
      console.log('No departments found. Please add departments first.');
      return;
    }

    const students = [
      { name: 'Naruto Uzumaki', email: 'naruto@example.com', phone_no: '1111111111', address: 'Konoha Village', dept_id: departments[0].id },
      { name: 'Sasuke Uchiha', email: 'sasuke@example.com', phone_no: '2222222222', address: 'Konoha Village', dept_id: departments[0].id },
      { name: 'Sakura Haruno', email: 'sakura@example.com', phone_no: '3333333333', address: 'Konoha Village', dept_id: departments[0].id },
      { name: 'Kakashi Hatake', email: 'kakashi@example.com', phone_no: '4444444444', address: 'Konoha Village', dept_id: departments[1].id },
      { name: 'Hinata Hyuga', email: 'hinata@example.com', phone_no: '5555555555', address: 'Konoha Village', dept_id: departments[1].id },
      { name: 'Shikamaru Nara', email: 'shikamaru@example.com', phone_no: '6666666666', address: 'Konoha Village', dept_id: departments[2].id },
      { name: 'Ino Yamanaka', email: 'ino@example.com', phone_no: '7777777777', address: 'Konoha Village', dept_id: departments[2].id },
      { name: 'Choji Akimichi', email: 'choji@example.com', phone_no: '8888888888', address: 'Konoha Village', dept_id: departments[3].id },
      { name: 'Kiba Inuzuka', email: 'kiba@example.com', phone_no: '9999999999', address: 'Konoha Village', dept_id: departments[3].id },
      { name: 'Tenten', email: 'tenten@example.com', phone_no: '0000000000', address: 'Konoha Village', dept_id: departments[4].id },
    ];

    await Student.bulkCreate(students);
    console.log('Students added successfully');
  } catch (error) {
    console.error('Error adding students:', error);
  }
};

addStudents().catch(console.error);
