import { useState } from "react";
import { Button, Container } from "react-bootstrap";

function Bai1() {
    const [count, setCount] = useState(0);
    return (
    <Container className="text-center mt-5">
        <h1>Count Time: {count}</h1>
        <Button variant="primary" onClick={() => setCount(count + 1)}>
            Click here
        </Button>
    </Container>
    );
}
export default Bai1;