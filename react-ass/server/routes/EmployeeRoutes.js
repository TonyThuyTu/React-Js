// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeControllers');



// Thêm nhân viên
router.post('/', employeeController.createEmployee);

// Lấy danh sách tất cả nhân viên
router.get('/', employeeController.getEmployees);

// Lấy thông tin một nhân viên theo ID
router.get('/:id', employeeController.getEmployeeById);

// Cập nhật thông tin nhân viên
router.put('/:id', employeeController.updateEmployee);

// Chặn / Bỏ chặn nhân viên
router.put('/:id/block', employeeController.toggleBlockEmployee);

module.exports = router;
