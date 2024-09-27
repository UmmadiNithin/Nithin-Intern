const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data', 'students.json');

// Read students data from the JSON file
const readStudents = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

// Write students data to the JSON file
const writeStudents = (students) => {
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
};

// Generate a unique registration number
const generateRegisterNo = () => {
    const students = readStudents();
    const maxNo = students.reduce((max, student) => {
        const num = parseInt(student.registerNo.replace('REG-', ''), 10);
        return num > max ? num : max;
    }, 0);
    return `REG-${maxNo + 1}`;
};

// Validate student data
const validateStudent = (student) => {
    return student.name && student.age && student.class && student.fathersName && student.contactNo;
};

// List all students
router.get('/', (req, res) => {
    const students = readStudents();
    res.json(students);
});

// Add a new student
router.post('/add', (req, res) => {
    const students = readStudents();
    const newStudent = req.body;

    if (validateStudent(newStudent)) {
        newStudent.registerNo = generateRegisterNo(); // Assign a unique registration number
        students.push(newStudent);
        writeStudents(students);
        res.redirect('/');
    } else {
        res.status(400).send('Invalid student data');
    }
});

// Edit an existing student
router.post('/edit/:registerNo', (req, res) => {
    const students = readStudents();
    const index = students.findIndex(student => student.registerNo === req.params.registerNo);

    if (index !== -1 && validateStudent(req.body)) {
        students[index] = req.body;
        students[index].registerNo = req.params.registerNo; // Keep the existing registration number
        writeStudents(students);
        res.redirect('/');
    } else {
        res.status(400).send('Invalid student data or student not found');
    }
});

// Delete a student
router.get('/delete/:registerNo', (req, res) => {
    const students = readStudents();
    const index = students.findIndex(student => student.registerNo === req.params.registerNo);

    if (index !== -1) {
        students.splice(index, 1);
        writeStudents(students);
        res.redirect('/');
    } else {
        res.status(404).send('Student not found');
    }
});

// Get a specific student by registration number
router.get('/:registerNo', (req, res) => {
    const students = readStudents();
    const student = students.find(student => student.registerNo === req.params.registerNo);

    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Student not found');
    }
});

module.exports = router;
