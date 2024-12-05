const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Endpoint de login
router.post('/login', authController.login);

module.exports = router;
