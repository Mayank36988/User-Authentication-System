const express = require('express');
const router = express.Router();
const {
  registerCustomer,
  registerAdmin,
  login,
  verifyEmail
} = require('../controllers/authController');

router.post('/register/customer', registerCustomer);
router.post('/register/admin', registerAdmin);
router.post('/login', login);
router.get('/verify/:token', verifyEmail);

module.exports = router; 