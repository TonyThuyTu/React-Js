import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function Bai4() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const [product, setProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formattedPrice, setFormattedPrice] = useState("");

  const onSubmit = (data) => {
    setProduct({
      ...data,
      image: imagePreview, // Gán đường dẫn ảnh đã chọn vào product
    });
    reset(); // Reset form sau khi submit
    setImagePreview(null); // Xóa preview ảnh
    setFormattedPrice(""); // Reset giá
  };

  // Xử lý chọn file ảnh và hiển thị preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setValue("image", file);
    }
  };

  // Xử lý nhập giá tiền
  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Chỉ giữ lại số
    let formatted = new Intl.NumberFormat("vi-VN").format(value); // Định dạng số VNĐ
    setFormattedPrice(formatted);
    setValue("price", value); // Lưu giá trị thực vào form
  };

  return (
    <Container className="mt-5">
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Input tên sản phẩm */}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </Form.Group>

        {/* Input chọn file ảnh */}
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          {errors.image && <p className="text-danger">{errors.image.message}</p>}
          {/* Phần xem thử ảnh ngay trong form */}
          {imagePreview && (
            <div className="mt-2">
              <h6>Preview Image:</h6>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: "150px" }} />
            </div>
          )}
        </Form.Group>

        {/* Input số lượng và giá */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                {...register("quantity", {
                  required: "Quantity is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Quantity must be greater than 0" },
                })}
              />
              {errors.quantity && <p className="text-danger">{errors.quantity.message}</p>}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Price (VND)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product price"
                value={formattedPrice}
                onChange={handlePriceChange}
              />
              {errors.price && <p className="text-danger">{errors.price.message}</p>}
            </Form.Group>
          </Col>
        </Row>

        {/* Input trạng thái sản phẩm */}
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select {...register("status")}>
            <option value="In Stock">In stock</option>
            <option value="Out of Stock">Out of stock</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>

      {/* Hiển thị thông tin sản phẩm */}
      {product && (
        <Container className="mt-5">
        <h3 className="text-center mb-4">Product Information</h3>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="card shadow-sm border-0 rounded">
              <div className="card-body text-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid rounded mb-3"
                    style={{ maxWidth: "150px" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-light text-muted rounded mb-3"
                    style={{ width: "150px", height: "150px", fontSize: "14px", fontWeight: "bold" }}
                  >
                    IMG PRODUCT
                  </div>
                )}
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text"><strong>Quantity:</strong> {product.quantity}</p>
                <p className="card-text"><strong>Status:</strong> {product.status}</p>
                <p className="card-text text-primary fs-5">
                  <strong>Price:</strong>{" "}
                  {new Intl.NumberFormat("vi-VN").format(product.price)} VND
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      )}
    </Container>
  );
}
