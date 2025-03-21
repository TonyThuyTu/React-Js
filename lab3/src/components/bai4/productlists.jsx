import { Badge } from 'react-bootstrap';

export default function ProductLists({ products }) {
  
    const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <table border="1" cellPadding="10" cellSpacing="0" width="100%">
      <thead>
        <tr>
          <th>#</th>
          <th>Tên sản phẩm</th>
          <th>Ảnh</th>
          <th>Số lượng</th>
          <th>Tình trạng</th>
          <th>Giá</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>
              <img src={product.image} alt={product.name} width="50" />
            </td>
            <td>{product.quantity}</td>
            <td>
              {product.quantity > 0 ? (
                <Badge bg="success">Còn hàng</Badge>
              ) : (
                <Badge bg="danger">Hết hàng</Badge>
              )}
            </td>
            <td>{formatPrice(product.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
