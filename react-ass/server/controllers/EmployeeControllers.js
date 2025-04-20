const Employee = require('../models/Employees');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Thêm nhân viên
exports.createEmployee = async (req, res) => {
  const { name, phone, email, position, password, role } = req.body;

  try {
    // Kiểm tra email và số điện thoại đã tồn tại chưa
    const existingEmail = await Employee.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    const existingPhone = await Employee.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: 'Số điện thoại đã tồn tại' });
    }

    // Tạo nhân viên mới — tuyệt đối KHÔNG truyền id
    const newEmployee = new Employee({
      name,
      phone,
      email,
      position,
      password,
      role,
      blocked: false // đảm bảo trường blocked luôn có mặc định
    });

    await newEmployee.save();

    // Gửi phản hồi thành công
    res.status(201).json({
      message: 'Thêm nhân viên thành công',
      employee: newEmployee
    });
  } catch (error) {
    console.error('Lỗi khi thêm nhân viên:', error);
    res.status(500).json({
      message: 'Lỗi khi thêm nhân viên',
      error: error.message
    });
  }
};


// Lấy thông tin nhân viên theo ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Không tìm thấy nhân viên' });

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin nhân viên', error });
  }
};

// Sửa thông tin nhân viên
exports.updateEmployee = async (req, res) => {
  const { name, phone, email, position, password } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Không tìm thấy nhân viên' });

    // Kiểm tra nếu có thay đổi mật khẩu thì mã hóa mật khẩu mới
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      employee.password = hashedPassword;
    }

    // Cập nhật các trường khác
    employee.name = name || employee.name;
    employee.phone = phone || employee.phone;
    employee.position = position || employee.position;
    employee.email = email || employee.email; // Nếu cần thay đổi email

    await employee.save();
    res.json({ message: 'Cập nhật thành công', employee });
  } catch (error) {
    console.error('Lỗi khi cập nhật nhân viên:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật nhân viên', error });
  }
};


// Chặn / Bỏ chặn nhân viên
exports.toggleBlockEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Không tìm thấy nhân viên' });

    if (employee.role === 1) return res.status(403).json({ message: 'Không thể chặn Super Admin' });

    employee.blocked = !employee.blocked;
    await employee.save();

    res.json({ message: `Nhân viên đã ${employee.blocked ? 'bị chặn' : 'được bỏ chặn'}`, employee });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thay đổi trạng thái chặn', error });
  }
};

// Lấy danh sách nhân viên
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách nhân viên', error });
  }
};


// Đăng nhập nhân viên
exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).json({ message: 'Email không tồn tại' });
    }

    // Kiểm tra trạng thái bị chặn của nhân viên
    if (employee.blocked) {
      return res.status(403).json({ message: 'Tài khoản đã bị chặn' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không chính xác' });
    }

    // Tạo token JWT
    const token = jwt.sign(
      {
        id: employee._id,
        name: employee.name,
        role: employee.role,
        email: employee.email,
      },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '2h' }
    );

    // Trả về token và thông tin nhân viên
    res.status(200).json({
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      }
    });
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi khi đăng nhập', error });
  }
};


