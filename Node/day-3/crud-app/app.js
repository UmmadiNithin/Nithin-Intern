const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const DATA_PATH = path.join(__dirname, 'data.json');

// Helper function to read data from JSON file
const readData = () => {
    const jsonData = fs.readFileSync(DATA_PATH);
    return JSON.parse(jsonData);
};

// Helper function to write data to JSON file
const writeData = (data) => {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

// GET all users
app.get('/api/users', (req, res) => {
    const data = readData();
    res.json(data);
});

// GET a specific user
app.get('/api/users/:id', (req, res) => {
    const data = readData();
    const user = data.find(user => user.id == req.params.id);
    res.json(user || {}); 
});

// POST a new user
app.post('/api/users', (req, res) => {
    const data = readData();
    const newUser = req.body;
    data.push(newUser);
    writeData(data);
    res.status(201).json(newUser);
});

// PUT update a user
app.put('/api/users/:id', (req, res) => {
    const data = readData();
    const index = data.findIndex(user => user.id == req.params.id);
    if (index !== -1) {
        data[index] = req.body;
        writeData(data);
        res.json(req.body);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// DELETE a user
app.delete('/api/users/:id', (req, res) => {
    let data = readData();
    data = data.filter(user => user.id != req.params.id);
    writeData(data);
    res.status(204).end();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
