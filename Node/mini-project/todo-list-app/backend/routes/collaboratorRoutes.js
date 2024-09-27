const express = require('express');
const { addCollaborator } = require('../controllers/collaboratorController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.post('/add', authenticateToken, addCollaborator);

module.exports = router;
