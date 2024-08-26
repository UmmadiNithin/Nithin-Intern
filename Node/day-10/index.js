const { setupDatabase, readDataAndWriteToJson, updateStudentRecord, deleteStudentRecord } = require('./src/crudOperations');


setupDatabase()
  .then(() => readDataAndWriteToJson())   
  .then(() => updateStudentRecord(3, {    
    name: 'kalyan',
    email: 'kalyan@example.com',
    phone_no: '9502145755',
    address: 'pdtr',
    department: 'cse',
    institution: 'rgm'
  }))
  .then((updatedRecord) => deleteStudentRecord(updatedRecord.id)) 
  .catch(console.error);
