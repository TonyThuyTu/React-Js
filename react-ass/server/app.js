const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const productRoutes = require('./routes/ProductRoutes');
const employeeRoutes = require('./routes/EmployeeRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Thêm dòng này

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối database
connectDB();

// Cấu hình CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/Product', productRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes); // ✅ Gắn route auth vào

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
