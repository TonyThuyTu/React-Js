const Product = require('../models/Products');

// Create
exports.createProduct = async (req, res) => {
  try {
    console.log('👉 req.body:', req.body);
    console.log('👉 req.file:', req.file);

    const { name, price, quantity, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = new Product({ name, price, quantity, description, image });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error('❌ Lỗi khi thêm sản phẩm:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
// Update
exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.id; // Lấy ID từ URL
  
      // Lấy dữ liệu từ body request
      const { name, price, quantity, description } = req.body;
      const updateData = { name, price, quantity, description };
  
      // Nếu có file hình ảnh mới, thêm vào updateData
      if (req.file) {
        updateData.image = req.file.filename;
      }
  
      // Tìm và cập nhật sản phẩm theo ID
      const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
  
      // Nếu không tìm thấy sản phẩm
      if (!product) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      }
  
      res.json(product); // Trả về sản phẩm đã được cập nhật
    } catch (err) {
      console.error('❌ Lỗi khi cập nhật sản phẩm:', err);
      res.status(500).json({ error: err.message });
    }
  };
  

// Delete
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    res.json({ message: 'Đã xóa sản phẩm' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
