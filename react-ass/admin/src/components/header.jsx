import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // ✅ Cách đúng để import

function Header() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt_decode(token); // ✅ Dùng đúng tên hàm
        setUserName(decodedToken.name);
        setUserRole(decodedToken.role);
        console.log('Decoded Token:', decodedToken); // ✅ Debug token
      } catch (error) {
        console.error('Lỗi khi giải mã token:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand me-5" to="/">🛠 Admin</Link>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item mx-2"><Link className="nav-link" to="/">Dashboard</Link></li>

          {userRole === 1 && (
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/employees">Nhân viên</Link>
            </li>
          )}

          <li className="nav-item mx-2"><Link className="nav-link" to="/products">Sản phẩm</Link></li>
          <li className="nav-item mx-2"><Link className="nav-link" to="/orders">Đơn hàng</Link></li>
        </ul>
      </div>

      <div className="d-flex align-items-center ms-auto">
        <span className="text-white me-3">Xin chào, <strong>{userName || 'Admin'}</strong></span>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Đăng xuất</button>
      </div>
    </nav>
  );
}

export default Header;
