const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeControllers');

// Đăng nhập nhân viên
router.post('/login', employeeController.loginEmployee);

module.exports = router;
