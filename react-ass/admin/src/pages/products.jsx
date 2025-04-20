import React, { useState, useEffect } from 'react';
import { Button, Table, Image, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import AddProductModal from '../components/Add/AddProduct';

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [role, setRole] = useState(null); // Role của người dùng

  // Lấy token và role từ localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role); // role: 1 (admin), 2 (nhân viên)
      } catch (error) {
        console.error('Lỗi giải mã token:', error);
      }
    }
  }, []);

  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Product');
        setProducts(response.data);
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
      }
    };
    fetchProducts();
  }, []);

  const openAddModal = () => setShowModal(true);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/Product/${id}`);
        if (response.status === 200) {
          setProducts(products.filter((product) => product._id !== id));
          setToastMessage('Sản phẩm đã được xóa thành công!');
          setToastType('success');
        }
      } catch (err) {
        console.error('Lỗi khi xóa sản phẩm:', err);
        setToastMessage('Lỗi khi xóa sản phẩm!');
        setToastType('error');
      }
    }
  };

  const goToEditPage = (product) => {
    navigate(`/edit-product/${product._id}`, { state: { product } });
  };

  const handleAddProduct = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/Product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setProducts([response.data, ...products]);
        setShowModal(false);
        setToastMessage('Sản phẩm đã được thêm thành công!');
        setToastType('success');
      }
    } catch (err) {
      console.error('Lỗi khi thêm sản phẩm:', err);
      setToastMessage('Lỗi khi thêm sản phẩm!');
      setToastType('error');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Danh sách sản phẩm</h3>

      {/* Chỉ hiển thị nút Thêm nếu không phải role 2 */}
      {role === 1 && (
        <Button variant="primary" onClick={openAddModal} className="mb-3">
          + Thêm sản phẩm
        </Button>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Mô tả</th>
            {role !== 2 && <th>Hành động</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p._id}</td>
              <td>
                <Image
                  src={`http://localhost:3000/uploads/${p.image}`}
                  width="200px"
                  height="100px"
                  thumbnail
                />
              </td>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString()} đ</td>
              <td>{p.quantity}</td>
              <td>{p.description}</td>
              {role === 1 && (
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => goToEditPage(p)}>
                    Sửa
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(p._id)}>
                    Xóa
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal thêm sản phẩm */}
      <AddProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleAddProduct}
      />

      {/* Thông báo Toast */}
      <Toast
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
        }}
        show={toastMessage !== ''}
        onClose={() => setToastMessage('')}
      >
        <Toast.Body style={{ color: toastType === 'success' ? 'green' : 'red' }}>
          {toastMessage}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ProductList;
