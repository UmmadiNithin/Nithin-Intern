import React from 'react';



// Q5: Display a List of Students and Their Majors using Props

  
  function StudentList() {
    const students = [
      { name: 'Nithin', major: 'Math' },
      { name: 'Harsha', major: 'Physics' },
      { name: 'Irfan', major: 'Chemistry' }
    ];
    return (
        <div>
        <h3>Student List:</h3>
        <ul>
            {students.map((student, index) => (
            <li key={index}>
                {student.name} -- Major: {student.major}
            </li>
            ))}
        </ul>
        </div>
    );
  }


  export default StudentList;
 
 