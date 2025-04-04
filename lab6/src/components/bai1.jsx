import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { Container, Button, Card, Navbar, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// Home Component with multiple post links
function Home() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow text-center">
        <h1 className="mb-4">Welcome to My Blog</h1>
        <p className="lead mb-4">Explore our latest articles</p>
        
        <Row className="g-3">
          {[1, 2, 3].map((id) => (
            <Col key={id} md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Post {id}</Card.Title>
                  <Card.Text>
                    Brief excerpt from post {id}...
                  </Card.Text>
                  <Link to={`/post/${id}`}>
                    <Button variant="primary">Read Post {id}</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Container>
  );
}

// Post Component with navigation between posts
function Post() {
  const { id } = useParams();
  const postIds = [1, 2, 3];
  const currentIndex = postIds.indexOf(Number(id));
  const prevPost = currentIndex > 0 ? postIds[currentIndex - 1] : null;
  const nextPost = currentIndex < postIds.length - 1 ? postIds[currentIndex + 1] : null;

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="mb-3">Post {id}</h2>
        <p className="mb-4">
          This is the detailed content of post {id}. Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit 
          arcu sed erat molestie vehicula.
        </p>
        
        <div className="d-flex justify-content-between">
          <div>
            {prevPost && (
              <Link to={`/post/${prevPost}`}>
                <Button variant="outline-primary">← Previous Post</Button>
              </Link>
            )}
          </div>
          
          <Link to="/">
            <Button variant="outline-secondary">Back to Home</Button>
          </Link>
          
          <div>
            {nextPost && (
              <Link to={`/post/${nextPost}`}>
                <Button variant="outline-primary">Next Post →</Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    </Container>
  );
}

// Navigation Component
function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          My React Blog
        </Navbar.Brand>
        
      </Container>
    </Navbar>
  );
}

// Main App Component
export default function Bai1() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}

