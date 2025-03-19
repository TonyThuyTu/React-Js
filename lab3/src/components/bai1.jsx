import { useState } from "react";
import { Button, Container } from "react-bootstrap";

function Bai1() {
    const [count, setCount] = useState(0);
    return (
    <Container className="text-center mt-5">
        <h1>Count Time: {count}</h1>
        <Button variant="primary" onClick={() => setCount(count + 1)} className="me-2">
            Click here
        </Button>

        <Button variant="danger" onClick={() => setCount(0)}>
            Reset
        </Button>
    </Container>
    );
}
export default Bai1;