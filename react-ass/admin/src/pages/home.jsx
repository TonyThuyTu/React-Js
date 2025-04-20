import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const pieData = {
    labels: ['Điện thoại', 'Laptop', 'Phụ kiện', 'Khác'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545'],
      },
    ],
  };

  const barData = {
    labels: ['T1', 'T2', 'T3', 'T4'],
    datasets: [
      {
        label: 'Doanh thu (triệu)',
        data: [30, 50, 40, 60],
        backgroundColor: '#0d6efd',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      {/* THỐNG KÊ */}
<div className="row g-3 mb-4">
  <div className="col-md-2">
    <div className="card text-white bg-primary">
      <div className="card-body">
        <h5 className="card-title">Sản phẩm</h5>
        <p className="fs-4">120</p>
      </div>
    </div>
  </div>
  <div className="col-md-2">
    <div className="card text-white bg-success">
      <div className="card-body">
        <h5 className="card-title">Đơn hàng</h5>
        <p className="fs-4">87</p>
      </div>
    </div>
  </div>
  <div className="col-md-2">
    <div className="card text-white bg-warning">
      <div className="card-body">
        <h5 className="card-title">Người dùng</h5>
        <p className="fs-4">34</p>
      </div>
    </div>
  </div>
  <div className="col-md-2">
    <div className="card text-white bg-info">
      <div className="card-body">
        <h5 className="card-title">Nhân viên</h5>
        <p className="fs-4">5</p>
      </div>
    </div>
  </div>
  <div className="col-md-4">
    <div className="card text-white bg-danger">
      <div className="card-body">
        <h5 className="card-title">Doanh thu</h5>
        <p className="fs-4">₫75,000,000</p>
      </div>
    </div>
  </div>
</div>


      {/* BIỂU ĐỒ */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title text-center">Doanh thu theo tháng</h6>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title text-center">Phân loại sản phẩm</h6>
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
