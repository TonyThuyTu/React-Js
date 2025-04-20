import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Table, Button, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddEmployeeModal from '../components/Add/AddEmployee';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const [currentRole, setCurrentRole] = useState(null); // Lưu role của người dùng hiện tại

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/employees');
      setEmployees(res.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhân viên:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();

    // Lấy role từ JWT
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setCurrentRole(decoded.role); // Giả sử token có trường "role"
      } catch (err) {
        console.error('Lỗi giải mã token:', err);
      }
    }
  }, []);

  const handleToggleBlock = async (id, name, isBlocked) => {
    const confirmText = isBlocked
      ? `Bạn có chắc muốn *bỏ chặn* nhân viên "${name}"?`
      : `Bạn có chắc muốn *chặn* nhân viên "${name}"?`;
  
    if (!window.confirm(confirmText)) return;
  
    try {
      await axios.put(`http://localhost:3000/api/employees/${id}/block`);
      fetchEmployees();
    } catch (error) {
      console.error('Lỗi khi chặn/bỏ chặn:', error);
    }
  };
  

  const handleAddEmployee = () => {
    fetchEmployees();
    setShowAddModal(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div>
      <h3>Danh sách nhân viên</h3>

      {showSuccessMessage && (
        <Alert variant="success">Thêm nhân viên thành công!</Alert>
      )}

      <Button className="mb-3" onClick={() => setShowAddModal(true)}>
        Thêm nhân viên
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Chức vụ</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp._id}>
              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.position}</td>
              <td>{emp.role === 1 ? 'Super Admin' : 'Nhân viên'}</td>
              <td>
                <Badge bg={emp.blocked ? 'danger' : 'success'}>
                  {emp.blocked ? 'Đã chặn' : 'Đang hoạt động'}
                </Badge>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => navigate(`/edit-employee/${emp._id}`)}
                >
                  Sửa
                </Button>

                {/* Chỉ hiện nếu người hiện tại có role 1 hoặc 2, và nhân viên không phải là Super Admin */}
                {emp.role !== 1 && (currentRole === 1 || currentRole === 2) && (
                  <Button
                    size="sm"
                    variant={emp.blocked ? 'success' : 'warning'}
                    className="ms-2"
                    onClick={() => handleToggleBlock(emp._id, emp.name, emp.blocked)}
                  >
                    {emp.blocked ? 'Bỏ chặn' : 'Chặn'}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddEmployeeModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onEmployeeAdded={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeeList;
