import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProductById, updateProduct } from '../Api/ProductApi';
import { Form, Button, Container, Spinner } from 'react-bootstrap';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/');
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data, id });
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container>
      <h1 className="mb-4">Edit Product</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            isInvalid={!!errors.name}
            {...register('name', { required: 'Name is required' })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            isInvalid={!!errors.price}
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Must be positive' },
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
              min: { value: 0, message: 'Must be positive' },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.quantity?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!isDirty || mutation.isLoading}>
          {mutation.isLoading ? 'Updating...' : 'Update Product'}
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};


