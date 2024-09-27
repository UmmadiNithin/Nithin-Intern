const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data', 'students.json');

// Download all students' records
router.get('/all', (req, res) => {
    if (fs.existsSync(filePath)) {
        res.setHeader('Content-Disposition', 'attachment; filename=students.json');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(fs.readFileSync(filePath));
    } else {
        res.status(404).send('File not found');
    }
});

// Download a specific student's record
router.get('/individual/:registerNo', (req, res) => {
    const students = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const student = students.find(student => student.registerNo === req.params.registerNo);

    if (student) {
        const fileName = `${student.registerNo}.json`;
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(student, null, 2));
    } else {
        res.status(404).send('Student not found');
    }
});

module.exports = router;
