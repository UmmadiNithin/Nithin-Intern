const express = require('express');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize'); 
const Student = require('./models/Student');
const Department = require('./models/Department');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); 

app.get('/export-and-download', async (req, res) => {
  try {
    const latestStudent = await Student.findOne({
      order: [['updatedAt', 'DESC']], 
      include: [Department]
    });

    if (!latestStudent) {
      return res.status(404).send('No students found');
    }

    const studentsToExport = await Student.findAll({
      where: {
        id: { [Op.ne]: latestStudent.id } 
      },
      include: [Department]
    });

    if (studentsToExport.length === 0) {
      return res.status(404).send('No students found to export');
    }

    const data = studentsToExport.map(student => ({
      id: student.id,
      name: student.name,
      email: student.email,
      phone_no: student.phone_no,
      address: student.address,
      department: student.Department ? student.Department.name : null,
    }));

    const dirPath = path.join(__dirname, './data');
    const filePath = path.join(dirPath, 'exported_students.json');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.download(filePath, 'exported_students.json', (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });

  } catch (error) {
    console.error('Error exporting student data:', error);
    res.status(500).send('Error exporting student data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
