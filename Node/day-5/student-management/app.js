const express = require('express');
const path = require('path');

// Ensure these paths are correct and the files exist
const studentRoutes = require('./routes/students');
const downloadRoutes = require('./routes/download');

const app = express();
const port = 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
app.use('/students', studentRoutes);
app.use('/students/download', downloadRoutes);

// Serve the main HTML file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Test route
app.get('/test', (req, res) => {
    console.log("Test route accessed");
    res.send('Test route is working!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
