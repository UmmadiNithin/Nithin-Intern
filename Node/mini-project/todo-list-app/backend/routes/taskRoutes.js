const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authenticateToken = require('../middlewares/auth.js');

const router = express.Router();

console.log("asdf");

router.post('/task/create', authenticateToken, createTask);
router.get('/tasks', authenticateToken, getTasks);
router.put('/task/update/:id', authenticateToken, updateTask);
router.delete('/task/delete/:id', authenticateToken, deleteTask);



module.exports = router;
