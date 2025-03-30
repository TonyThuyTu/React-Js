import { useState, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import axios from "axios";

export default function Bai2() {
  const [posts, setPosts] = useState([]);
//   const [users, setPosts] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:3000/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Có lỗi khi fetch dữ liệu:", error));
  }, []);
  
  return (
    <Container className="mt-5">
      <h3>Danh sách bài viết</h3>
      <ListGroup>
        {posts.map((post) => (
          <ListGroup.Item key={post.id}>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>

//     <Container className="mt-5">
//     <h3>Danh sách người dùng</h3>
//     <ListGroup>
//     {users.map((post) => (
//         <ListGroup.Item key={users.id}>
//         <h5>{users.name}</h5>
//         <p>{users.email}</p>
//         </ListGroup.Item>
//     ))}
//     </ListGroup>
//     </Container>
  );
}
