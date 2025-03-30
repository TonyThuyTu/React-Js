import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

export default function Bai3() {
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState({});
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/posts")
      .then((response) => setTotalPosts(response.data.length))
      .catch((error) => console.error("Có lỗi khi fetch dữ liệu:", error));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${postId}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Có lỗi khi fetch dữ liệu:", error));
  }, [postId]);

  return (
    <Container className="mt-5">
     
      <Button 
        variant="success" 
        className="me-2" 
        onClick={() => postId > 1 && setPostId(postId - 1)}
        disabled={postId <= 1}>
        Xem bài viết trước
      </Button>
       <Button 
        variant="primary"    
        onClick={() => postId < totalPosts && setPostId(postId + 1)}
        disabled={postId >= totalPosts}>
        Xem bài viết sau
      </Button>
      <h3 className="mt-3">{post.title}</h3>
      <p>{post.body}</p>
    </Container>
  );
}

