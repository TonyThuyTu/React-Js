const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const productController = require('../controllers/ProductControllers');

// Route để thêm sản phẩm
router.post('/', upload.single('image'), productController.createProduct);

// Route để lấy danh sách sản phẩm
router.get('/', productController.getProducts);

// Route để sửa sản phẩm
router.put('/:id', upload.single('image'), productController.updateProduct);

// Route xóa sản phẩm
router.delete('/:id', productController.deleteProduct);

module.exports = router;
