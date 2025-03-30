import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Bai5() {
  const [postData, setPostData] = useState({});
  const [postId, setPostId] = useState(1);
  const [responseMessage, setResponseMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${postId}`)
      .then((response) => {
        setPostData(response.data);
        reset(response.data);
      })
      .catch((error) => console.error("Có lỗi khi fetch dữ liệu:", error));
  }, [postId, reset]);

  const handleUpdate = (data) => {
    axios.put(`http://localhost:3000/posts/${postId}`, data)
      .then(() => setResponseMessage("Bài viết đã được cập nhật thành công!"))
      .catch(() => setResponseMessage("Có lỗi khi cập nhật bài viết."));
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/posts/${postId}`)
      .then(() => setResponseMessage("Bài viết đã được xóa thành công!"))
      .catch(() => setResponseMessage("Có lỗi khi xóa bài viết."));
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit(handleUpdate)}>
        <Form.Group className="mb-3">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control type="text" {...register("title", { required: "Tiêu đề không được để trống" })} />
          {errors.title && <p className="text-danger">{errors.title.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control as="textarea" {...register("body", { required: "Nội dung không được để trống" })} />
          {errors.body && <p className="text-danger">{errors.body.message}</p>}
        </Form.Group>
        <Button variant="primary" type="submit">Cập nhật bài viết</Button>
        <Button variant="danger" onClick={handleDelete} className="ms-2">Xóa bài viết</Button>
      </Form>
      {responseMessage && <p className="mt-3">{responseMessage}</p>}
    </Container>
  );
}
