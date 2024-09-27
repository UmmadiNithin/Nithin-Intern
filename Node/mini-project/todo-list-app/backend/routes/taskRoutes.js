const express = require('express');
const { createTask, getTasks, updateTask, deleteTask ,getsingleTask,searchTasks } = require('../controllers/taskController');
const authenticateToken = require('../middlewares/auth.js');

const router = express.Router();

router.post('/task/create', authenticateToken, createTask);
router.get('/tasks', authenticateToken, getTasks);
router.get('/singletask/:id',authenticateToken,getsingleTask)
router.put('/task/update/:id', authenticateToken, updateTask);
router.delete('/task/delete/:id', authenticateToken, deleteTask);

router.get('/search', authenticateToken, searchTasks);


module.exports = router;
