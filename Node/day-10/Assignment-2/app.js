const express = require('express');
const { Pool } = require('pg');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const session = require('express-session');
const { authenticate } = require('./middleware/validateMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(session({
  secret: 'JVNPP143', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'JVNPP143',
  port: 5432,
});

global.pool = pool; 

 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', authenticate, (req, res) => {
  if (req.user) {
    res.sendFile(path.join(__dirname, 'views', 'userPage.html'));
  } else {
    res.redirect('/auth/login');
  }
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.get('/user/data', (req, res) => {
  if (req.user) {
    res.json({
      username: req.user.username,
      email: req.user.email,
      phone_no: req.user.phone_no,
      address: req.user.address,
      department: req.user.department,
      institution: req.user.institution
    });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});
const createTable = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone_no VARCHAR(20),
        address TEXT,
        department VARCHAR(100),
        institution VARCHAR(100)
      );
    `);
    await client.query('COMMIT');
    console.log('Table created successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating table:', error);
  } finally {
    client.release();
  }
};

createTable().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Error starting server:', error);
});

