// middlewares/auth.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Không tìm thấy token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    req.user = decoded;  // Lưu thông tin user vào request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ hoặc hết hạn' });
  }
};

module.exports = authMiddleware;
