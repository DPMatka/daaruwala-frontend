const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// 👉 POST /api/auth/login
router.post('/login', login);

// ✅ If user registration is not needed, remove or disable it
// router.post('/register', register); // disabled for admin-only system

module.exports = router;