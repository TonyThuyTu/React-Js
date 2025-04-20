import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddProductModal = ({ show, onHide, onSave }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
    image: null, // Lưu trữ tệp hình ảnh
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({ ...prev, image: file })); // Lưu trực tiếp tệp hình ảnh
    }
  };

  const handleSubmit = () => {
    // Kiểm tra các trường thông tin
    if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.description) {
      setError('Vui lòng điền đầy đủ các trường thông tin.');
      return;
    }

    if (isNaN(newProduct.price) || newProduct.price <= 0) {
      setError('Giá phải là một số dương.');
      return;
    }

    if (isNaN(newProduct.quantity) || newProduct.quantity < 0) {
      setError('Số lượng phải là một số dương hoặc bằng 0.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('quantity', newProduct.quantity);
    formData.append('description', newProduct.description);

    if (newProduct.image) {
      formData.append('image', newProduct.image); // Thêm hình ảnh vào FormData
    }

    onSave(formData); // Gửi formData lên
    setNewProduct({ name: '', price: '', quantity: '', description: '', image: null }); // Reset form
    setError(''); // Xóa lỗi nếu có
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm sản phẩm mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị lỗi nếu có */}

        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formQuantity">
            <Form.Label>Số lượng</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={newProduct.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
        </Form>

        {newProduct.image && (
          <div className="mt-3">
            <img src={URL.createObjectURL(newProduct.image)} alt="Preview" width="100" />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Đóng</Button>
        <Button variant="primary" onClick={handleSubmit}>Lưu</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
