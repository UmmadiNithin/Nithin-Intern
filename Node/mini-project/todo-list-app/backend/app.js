const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path'); 
const sequelize = require('./config/database'); 
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const collaboratorRoutes = require('./routes/collaboratorRoutes');
const cors=require('cors')

const app = express();

// Middleware
app.use(bodyParser.json()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/collaborators', collaboratorRoutes);

// app.get('/login', (req, res) => {
//     console.log('Serving login HTML file');
//     res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
// });

// app.get('/register', (req, res) => {
//     console.log('Serving register HTML file');
//     res.sendFile(path.join(__dirname, 'frontend', 'register.html'));
// });

// app.get('/home', (req, res) => {
//     console.log('Serving home HTML file');
//     res.sendFile(path.join(__dirname, 'frontend', 'home.html'));
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'home.html'));
// });

sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
        return sequelize.sync(); 
    })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
