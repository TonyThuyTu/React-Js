import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productFromState = location.state?.product;

  const [product, setProduct] = useState(productFromState || {});
  const [initialProduct, setInitialProduct] = useState(productFromState || {});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!productFromState) {
      alert('Không có dữ liệu sản phẩm để chỉnh sửa!');
      navigate('/products');
    } else {
      setInitialProduct(productFromState);
      setProduct(productFromState);  // Đảm bảo product được set đúng từ đầu
    }
  }, [productFromState, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Lưu trực tiếp tệp hình ảnh
      setProduct((prev) => ({
        ...prev,
        image: file.name,  // Lưu tên file, có thể thay đổi tùy vào cách bạn lưu ảnh trên server
      }));
    }
  };

  const isFormChanged = () => {
    // So sánh thông tin sản phẩm để kiểm tra sự thay đổi
    return (
      JSON.stringify(product) !== JSON.stringify(initialProduct) ||
      imageFile !== null
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('description', product.description);

    if (imageFile) {
      formData.append('image', imageFile); // Thêm hình ảnh vào FormData
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/Product/${product._id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 200) {
        // Điều hướng lại trang sản phẩm
        navigate('/products');
      }
    } catch (err) {
      console.error('Lỗi khi cập nhật sản phẩm:', err);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <div className="container mt-4">
      <h3>Chỉnh sửa sản phẩm</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={product.name || ''}
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Giá</label>
          <input
            type="number"
            name="price"
            value={product.price || ''}
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Số lượng</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity || ''}
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Mô tả</label>
          <textarea
            name="description"
            value={product.description || ''}
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Hình ảnh</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleImageChange}
          />
          {imageFile ? (
            <div className="mt-2">
              <img src={URL.createObjectURL(imageFile)} alt="Preview" width="200" />
            </div>
          ) : (
            product.image && (
              <div className="mt-2">
                <img
                  src={`http://localhost:3000/uploads/${product.image}`} // Đảm bảo đường dẫn đúng
                  alt="Current"
                  width="200"
                  style={{ objectFit: 'cover' }}
                />
                <p className="mt-2">Hình ảnh hiện tại:</p>
              </div>
            )
          )}
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-success"
            disabled={!isFormChanged()}
          >
            Lưu
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
