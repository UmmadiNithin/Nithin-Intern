
const express = require('express');
const { createPost} = require('../controllers/samplecontroller');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticateToken, createPost);

module.exports = router;
