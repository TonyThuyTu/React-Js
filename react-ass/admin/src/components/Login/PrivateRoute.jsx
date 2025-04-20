import React from 'react';
import { Navigate } from 'react-router-dom';

// Hàm kiểm tra token
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // trả về true nếu có token
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
