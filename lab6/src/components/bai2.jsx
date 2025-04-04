import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import { Container, Button, Navbar, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <Container className="mt-5 text-center">
      <Card className="p-4 shadow">
        <h1 className="mb-4">Trang Chủ</h1>
        <p className="lead mb-4">Chào mừng bạn đến với ứng dụng React của chúng tôi</p>
        <Link to="/about">
          <Button variant="primary" size="lg" className="px-4">
            Đi đến trang Giới thiệu
          </Button>
        </Link>
      </Card>
    </Container>
  );
}

function About() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h1 className="mb-4">Giới thiệu</h1>
        <div className="text-content">
          <p className="mb-3">Đây là phần giới thiệu chi tiết của ứng dụng.</p>
          <p className="mb-3">Ứng dụng được xây dựng bằng React và React Bootstrap.</p>
          <p>Phiên bản hiện tại: 1.0.0</p>
        </div>
        <Link to="/" className="mt-4 d-block">
          <Button variant="outline-secondary">
            ← Quay lại Trang chủ
          </Button>
        </Link>
      </Card>
    </Container>
  );
}

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" className="mb-4 mt-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          React Software
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to="/about" className="text-white ms-3">
              Giới thiệu
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default function Bai2() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

