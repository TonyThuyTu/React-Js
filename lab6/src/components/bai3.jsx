import {
BrowserRouter as Router,
Routes,
Route,
useNavigate,
useParams,
useSearchParams,
Link,
} from "react-router-dom";
import { Container, Button, Form, Card, Navbar, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
const [searchParams, setSearchParams] = useSearchParams();
const searchTerm = searchParams.get("search") || "";
const navigate = useNavigate();

const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
    setSearchParams({ search: query });
    navigate(`/search/${query}`);
    }
};

return (
    <Container className="mt-5">
    <Card className="p-4 shadow">
        <h1 className="mb-4">Trang Chủ</h1>
        
        <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group controlId="searchForm">
            <Form.Control
            type="text"
            name="search"
            defaultValue={searchTerm}
            placeholder="Nhập từ khóa tìm kiếm..."
            size="lg"
            />
            <Button 
            type="submit" 
            variant="primary" 
            className="mt-3 px-4"
            size="lg"
            >
            Tìm kiếm
            </Button>
        </Form.Group>
        </Form>

        {searchTerm && (
        <Alert variant="info">
            Bạn đang tìm kiếm: <strong>{searchTerm}</strong>
        </Alert>
        )}
    </Card>
    </Container>
);
}

function SearchResults() {
const { searchTerm } = useParams();
const navigate = useNavigate();

// Sample search results - replace with real data
const results = [
    { id: 1, title: `Kết quả 1 cho "${searchTerm}"`, content: "Nội dung chi tiết kết quả 1" },
    { id: 2, title: `Kết quả 2 cho "${searchTerm}"`, content: "Nội dung chi tiết kết quả 2" },
];

return (
    <Container className="mt-5">
    <Card className="p-4 shadow">
        <h2 className="mb-4">Kết quả tìm kiếm cho "{searchTerm}"</h2>
        
        {results.length > 0 ? (
        results.map(result => (
            <Card key={result.id} className="mb-3">
            <Card.Body>
                <Card.Title>{result.title}</Card.Title>
                <Card.Text>{result.content}</Card.Text>
            </Card.Body>
            </Card>
        ))
        ) : (
        <Alert variant="warning">
            Không tìm thấy kết quả nào phù hợp
        </Alert>
        )}

        <Button 
        variant="outline-secondary" 
        onClick={() => navigate('/')}
        className="mt-3"
        >
        ← Quay lại Trang chủ
        </Button>
    </Card>
    </Container>
);
}

function Navigation() {
return (
    <Navbar bg="dark" variant="dark" className="mb-4 mt-3">
    <Container>
        <Navbar.Brand as={Link} to="/">
        Ứng dụng Tìm kiếm
        </Navbar.Brand>
    </Container>
    </Navbar>
);
}
 
export default function Bai3() {
return (
    <Router>
    <Navigation />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchTerm" element={<SearchResults />} />
    </Routes>
    </Router>
);
}

