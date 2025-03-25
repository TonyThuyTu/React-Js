import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

export default function Bai3() {

  const [formData, setFormData] = useState({ name: "", age: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên.");
      return;
    }
    if (formData.age === "" || isNaN(formData.age) || formData.age < 0) {
      alert("Vui lòng nhập tuổi hợp lệ.");
      return;
    }
    alert(`Tên: ${formData.name}, Tuổi: ${formData.age}`);
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Nhập tên của bạn"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="number"
            name="age"
            placeholder="Nhập tuổi của bạn"
            value={formData.age}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Gửi
        </Button>
      </Form>
    </Container>
  );
}


