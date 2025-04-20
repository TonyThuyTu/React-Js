const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu trữ hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Thư mục lưu trữ
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tên file
  }
});

// Kết hợp multer với cấu hình lưu trữ
const upload = multer({ storage: storage });

module.exports = upload;
