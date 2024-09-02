const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); 
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const collaboratorRoutes = require('./routes/collaboratorRoutes');  
const cors=require('cors');
const { FORCE } = require('sequelize/lib/index-hints');

const app = express();

// Middleware
app.use(bodyParser.json()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend')); 
app.use(cors())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/collaborators', collaboratorRoutes);



sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
        return sequelize.sync({alter: true}); 

    })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
