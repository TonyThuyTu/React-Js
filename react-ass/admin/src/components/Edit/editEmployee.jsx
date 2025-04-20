import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/employees/${id}`)
      .then((res) => {
        setEmployee(res.data);
        reset({ ...res.data, password: '' }); // reset không hiển thị mật khẩu
      })
      .catch((err) => {
        console.error('Lỗi tải dữ liệu nhân viên:', err);
      });
  }, [id, reset]);

  const handleFormSubmit = async (data) => {
    setServerError('');
    try {
      // Chỉ gửi password nếu người dùng nhập mới
      const updatedData = {
        name: data.name,
        phone: data.phone,
        position: data.position,
      };

      if (data.password && data.password.length >= 6) {
        updatedData.password = data.password;
      }

      const res = await axios.put(`http://localhost:3000/api/employees/${id}`, updatedData);
      if (res.status === 200) {
        navigate('/employees');
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setServerError(err.response.data.message);
      } else {
        console.error('Lỗi cập nhật:', err);
        setServerError('Có lỗi xảy ra khi cập nhật thông tin nhân viên');
      }
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  if (!employee) return <div>Đang tải dữ liệu nhân viên...</div>;

  return (
    <div className="container">
      <h2>Sửa thông tin nhân viên</h2>
      {serverError && <Alert variant="danger">{serverError}</Alert>}

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            {...register('name', { required: 'Tên là bắt buộc' })}
            isInvalid={errors.name}
            disabled={employee.role === 1}
          />
          <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            {...register('phone', {
              required: 'Số điện thoại là bắt buộc',
              pattern: { value: /^\d{10}$/, message: 'SĐT phải đủ 10 số' },
            })}
            isInvalid={errors.phone}
            disabled={employee.role === 1}
          />
          <Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu mới (bỏ trống nếu không đổi)</Form.Label>
          <div className="d-flex">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                validate: (value) =>
                  value === '' || value.length >= 6 || 'Mật khẩu phải >= 6 ký tự',
              })}
              isInvalid={errors.password}
             
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              className="ms-2"
              type="button"
            >
              {showPassword ? 'Ẩn' : 'Hiện'}
            </Button>
          </div>
          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={employee.email} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Chức vụ</Form.Label>
          <Form.Control
            type="text"
            {...register('position', { required: 'Chức vụ là bắt buộc' })}
            isInvalid={errors.position}
            disabled={employee.role === 1}
          />
          <Form.Control.Feedback type="invalid">{errors.position?.message}</Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleCancel}>
            Hủy
          </Button>
          <Button variant="primary" type="submit" disabled={!isDirty}>
            Lưu thay đổi
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditEmployee;
