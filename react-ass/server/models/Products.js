const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose);

// Định nghĩa schema cho sản phẩm
const productSchema = new mongoose.Schema(
  {
    // Loại bỏ trường _id mặc định để dùng số nguyên tự động tăng
    _id: { type: Number },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

// Sử dụng plugin mongoose-sequence để tạo trường _id tự động tăng
productSchema.plugin(mongooseSequence);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
