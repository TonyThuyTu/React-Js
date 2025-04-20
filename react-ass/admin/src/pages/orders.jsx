// src/pages/OrderList.jsx
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const OrderList = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: 'Nguyễn Văn A',
      productName: 'Chuột Gaming Razer',
      price: 1500000,
      quantity: 2,
      status: 'Chờ xác nhận',
    },
    {
      id: 2,
      customerName: 'Trần Thị B',
      productName: 'Bàn phím cơ Logitech',
      price: 1200000,
      quantity: 1,
      status: 'Chờ xác nhận',
    },
    {
      id: 3,
      customerName: 'Lê Văn C',
      productName: 'Tai nghe Sony',
      price: 1000000,
      quantity: 3,
      status: 'Chờ xác nhận',
    },
    {
      id: 4,
      customerName: 'Phạm Thị D',
      productName: 'Laptop HP',
      price: 15000000,
      quantity: 1,
      status: 'Chờ xác nhận',
    },
    {
      id: 5,
      customerName: 'Nguyễn Thị E',
      productName: 'Màn hình LG',
      price: 5000000,
      quantity: 2,
      status: 'Chờ xác nhận',
    },
  ]);

  const handleConfirm = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: 'Đã xác nhận' } : order
      )
    );
  };

  const handleCancel = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: 'Đã hủy' } : order
      )
    );
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Quản lý đơn hàng</h3>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Người đặt</th>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.productName}</td>
              <td>{order.price.toLocaleString()} đ</td>
              <td>{order.quantity}</td>
              <td>
                <span
                  className={`badge ${
                    order.status === 'Chờ xác nhận'
                      ? 'bg-warning'
                      : order.status === 'Đã xác nhận'
                      ? 'bg-success'
                      : 'bg-danger'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td>
                {order.status === 'Chờ xác nhận' && (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleConfirm(order.id)}
                    >
                      Xác nhận
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleCancel(order.id)}
                    >
                      Hủy
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderList;
