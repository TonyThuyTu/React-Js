import { useState } from "react";
import { Button, Container } from "react-bootstrap";

export default function Bai1() {

    const [message, setMessage] = useState("");
    const handleClick = (buttonNumber) =>{

        setMessage(`Your button number is ${buttonNumber}`);

    };
            
    return(

        <Container className = "text-center mt-5">
            
            <Button variant = "primary" onClick = {() => handleClick(1)} className = "me-2">1</Button>

            <Button variant = "danger" onClick = {() => handleClick(2)} className = "me-2">2</Button>

            <Button variant = "success" onClick = {() => handleClick(3)} className = "me-2">3</Button>

            <p className="mt-3">{ message }</p>

        </Container>

    );

}
