import { useState } from 'react';
import { Button, Container, Badge } from 'react-bootstrap';

export default function Bai2() {

    const[isOn, setOn] = useState(false);

    return(

        <Container className='text-center mt-5'>

            <Button variant={isOn? "danger":"primary"} onClick={() => setOn(!isOn)}>

                {isOn ? 'Off' : 'On'}

            </Button>
            
            <p className="mt-3">

                State:{" "}

            <Badge bg={isOn ? "success" : "secondary"}>
                
                {isOn ? "On" : "Off"}
            
            </Badge>
            
            </p>

        </Container>

    );

}
