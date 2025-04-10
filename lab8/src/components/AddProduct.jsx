import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { addProduct } from '../Api/ProductApi';
import { useForm } from 'react-hook-form';

export default function AddProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      reset();
      navigate('/');
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Container>
      <h1 className="mb-4">Add New Product</h1>

      {mutation.isError && (
        <Alert variant="danger" className="mb-3">
          Error: {mutation.error.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            isInvalid={!!errors.name}
            {...register('name', { required: 'Product name is required' })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Enter price"
            isInvalid={!!errors.price}
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.price?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            isInvalid={!!errors.quantity}
            {...register('quantity', {
              required: 'Quantity is required',
              min: { value: 0, message: 'Quantity must be positive' },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.quantity?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" />
                <span className="ms-2">Saving...</span>
              </>
            ) : (
              'Save Product'
            )}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

