import { useState } from "react";
import { Button, Container } from "react-bootstrap";

function Bai2() {

    const [counter, setCounter] = useState(0);
    const [message, setMessage] = useState("");
    const handleIncrease = () => {
        setCounter(counter + 1);
        setMessage("Increase");
    };
    const handleDecrease = () => {
        setCounter(counter - 1);
        setMessage("Decrease");
    };
return (
    <Container className="text-center mt-5">
    <h1>Currently number : {counter}</h1>
    <p>State: {message}</p>
        <Button variant="success" onClick={handleIncrease} className="me-2">
        Increase value
        </Button>
        <Button variant="danger" onClick={handleDecrease}>
        Descrease value
        </Button>
    </Container>

);

}

export default Bai2;