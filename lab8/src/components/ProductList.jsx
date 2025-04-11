import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, Button, Container, Alert, Spinner, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../Api/ProductApi';

export default function ProductList() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true); // loading giả lập

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2000); // Delay 2s
    return () => clearTimeout(timer);
  }, []);

  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      deleteMutation.mutate(selectedProduct.id);
      setShowConfirm(false);
    }
  };

  if (isLoading || showLoadingScreen) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <div className="mt-2 fw-bold">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="danger" className="mt-3">
        Error: {error.message}
      </Alert>
    );
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Product List</h1>
        <Button as={Link} to="/add-product" variant="primary">
          Add Product
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(product)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal xác nhận xóa */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
