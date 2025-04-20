import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddEmployeeModal = ({ show, handleClose, onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    position: '',
    role: 2,
    blocked: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validate form data before submission
  const validate = () => {
    const err = {};
    if (!formData.name) err.name = 'Tên không được để trống';
    if (!/^\d{10}$/.test(formData.phone)) err.phone = 'SĐT phải đủ 10 số';
    if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = 'Email không hợp lệ';
    if (!formData.password || formData.password.length < 6) err.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (!formData.position) err.position = 'Chức vụ không được để trống';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Reset form after success
  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      password: '',
      position: '',
      role: 2,
      blocked: false
    });
    setErrors({});
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    console.log('Dữ liệu trước khi gửi:', formData);  // Log dữ liệu sẽ được gửi
  
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/employees', formData);
      
      console.log('Phản hồi từ server:', res.data);  // Log dữ liệu trả về từ server
  
      onEmployeeAdded(res.data);  // Cập nhật danh sách nhân viên
      resetForm();  // Reset form
      handleClose();  // Đóng modal
    } catch (err) {
      console.error('Lỗi khi thêm nhân viên:', err);  // Log lỗi nếu có
  
      if (err.response?.status === 409) {
        const msg = err.response.data.message;
        if (msg.includes('Email')) {
          setErrors((prev) => ({ ...prev, email: msg }));
        }
        if (msg.includes('Phone') || msg.includes('SĐT')) {
          setErrors((prev) => ({ ...prev, phone: msg }));
        }
      } else {
        alert(err.response?.data?.message || 'Lỗi thêm nhân viên');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm nhân viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {['name', 'phone', 'email', 'password', 'position'].map((field) => (
            <Form.Group key={field} className="mt-2">
              <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
              <Form.Control
                type={field === 'password' ? 'password' : 'text'}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                isInvalid={!!errors[field]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[field]}
              </Form.Control.Feedback>
            </Form.Group>
          ))}

          <Form.Group className="mt-3">
            <Form.Label>Vai trò</Form.Label>
            <Form.Select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: parseInt(e.target.value) })
              }
            >
              <option value={1}>Super Admin</option>
              <option value={2}>Nhân viên</option>
            </Form.Select>
          </Form.Group>

          <Button className="mt-3" type="submit" disabled={loading}>
            {loading ? 'Đang thêm...' : 'Thêm'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployeeModal;
