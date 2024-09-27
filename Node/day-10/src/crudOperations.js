const client = require('./db');
const fs = require('fs');
const path = require('path');


async function setupDatabase() {
  const createSchemaQuery = 'CREATE SCHEMA IF NOT EXISTS student_management_system';
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS student_management_system.students_details (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      phone_no VARCHAR(15),
      address TEXT,
      department VARCHAR(50),
      institution VARCHAR(100)
    );
  `;


  const insertRecordsQuery = `
    INSERT INTO student_management_system.students_details (name, email, phone_no, address, department, institution)
    VALUES 
    ('nithin', 'nithin@example.com', '1234567890', '123 Main St', 'Cse', 'svce'),
    ('pavan', 'pavan@example.com', '0987654321', '456 Oak St', 'ece', 'svr'),
    ('deepak', 'deepak@example.com', '5678901234', '321 Maple St', 'civil', 'srm'),
    ('umar', 'umar@example.com', '5678901234', '321 Maple St', 'mech', 'lpu'),
    ('farook', 'farook@example.com', '5678901234', '321 Maple St', 'cse', 'ksrm'),
    ('basha', 'basha@example.com', '5678901234', '321 Maple St', 'ece', 'rgm'),
    ('harsha', 'harsha@example.com', '5678901234', '321 Maple St', 'mech', 'Sv'),
    ('dhanan', 'dhanan@example.com', '5678901234', '321 Maple St', 'mech', 'kl'),
    ('novfal', 'novfal@example.com', '3456789012', '789 Pine St', 'civil', 'knl'),
    ('babu', 'babu@example.com', '5678901234', '321 Maple St', 'ece', 'rgm')
  `;

  try {
    await client.query(createSchemaQuery);
    await client.query(createTableQuery);
    await client.query(insertRecordsQuery);
    console.log('Table created and records inserted.');
  } catch (err) {
    console.error('Error setting up the database:', err.message);
  }
}

async function readDataAndWriteToJson() {
  try {
    const res = await client.query('SELECT * FROM student_management_system.students_details');
    console.table(res.rows);

   
    fs.writeFileSync(path.join(__dirname, '../public/downloads/students.json'), JSON.stringify(res.rows, null, 2));
    console.log("Data written to students.json");
  } catch (err) {
    console.error('Error reading data:', err.message);
  }
}


async function updateStudentRecord(studentId, newDetails) {
  const { name, email, phone_no, address, department, institution } = newDetails;
  const updateQuery = `
    UPDATE student_management_system.students_details 
    SET name = $1, email = $2, phone_no = $3, address = $4, department = $5, institution = $6
    WHERE id = $7
    RETURNING *;
  `;

  try {
    const res = await client.query(updateQuery, [name, email, phone_no, address, department, institution, studentId]);
    console.log('Updated record:', res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error('Error updating record:', err.message);
  }
}



async function deleteStudentRecord(studentId) {
  const deleteQuery = `DELETE FROM student_management_system.students_details  WHERE id = $1 RETURNING *;`;

  try {
    const res = await client.query(deleteQuery, [studentId]);
    console.log('Deleted record:', res.rows[0]);


    fs.writeFileSync(path.join(__dirname, '../public/downloads/deleted_student.json'), JSON.stringify(res.rows[0], null, 2));
    console.log("Deleted record written to deleted_student.json");
  } catch (err) {
    console.error('Error deleting record:', err.message);
  }
}

module.exports = {
  setupDatabase,
  readDataAndWriteToJson,
  updateStudentRecord,
  deleteStudentRecord
};
