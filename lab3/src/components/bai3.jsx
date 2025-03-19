import { useState } from "react";
import { Button, Alert } from "react-bootstrap";

function Bai3() {

    const [show, setShow] = useState(true);

    return(

        <div className="text-center mt-5">

            {show && <Alert variant="info">
                
                This is Tony Nguyen speaking:

                <br />

                I love React
                
            </Alert>}

            <Button variant="primary" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
            </Button>

        </div>

    );

}
export default Bai3;
