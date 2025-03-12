import {  Card, Row, Col, Container } from "react-bootstrap";

    function Bai4() {
        return (
        <Container>

            ALL MY SOCIAL MEDIA
        
            <Row className="justify-content-center">
                <Col md={4} className="mb-4">
                    <Card>
                    <Card.Img variant="top" src="https://picsum.photos/id/1/300/300" />
                    <Card.Body>
                    <Card.Title>Facebook</Card.Title>
                    <Card.Text>We can be a co-worker</Card.Text>
                    <a href="https://www.facebook.com/hoangtu.120405/">Check It</a>
                    </Card.Body>
                    </Card>
                </Col>

                <Col md={4} className="mb-4">
                    <Card>
                    <Card.Img variant="top" src="https://picsum.photos/id/1/300/300" />
                    <Card.Body>
                    <Card.Title>Instagram</Card.Title>
                    <Card.Text>Follow my IG for more picture</Card.Text>
                    <a href="https://www.instagram.com/tny.ng/">Check It</a>
                    </Card.Body>
                    </Card>
                </Col>

                <Col md={4} className="mb-4">
                    <Card>
                    <Card.Img variant="top" src="https://picsum.photos/id/1/300/300" />
                    <Card.Body>
                    <Card.Title>Github</Card.Title>
                    <Card.Text>All my products right here</Card.Text>
                    <a href="https://github.com/TonyThuyTu">Check It</a>
                    </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
        );
    }
export default Bai4;