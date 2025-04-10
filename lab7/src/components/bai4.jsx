import React, { createContext, useReducer, useContext, useEffect } from "react";
import { Button, Container, Card, Spinner, Row, Col } from "react-bootstrap";
import axios from "axios";

// Tạo Context
const UserContext = createContext();

// Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Provider
function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  const fetchUser = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users/1");
      dispatch({ type: "SET_USER", payload: response.data });
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

// Component chi tiết người dùng
function UserDetails() {
  const { state } = useContext(UserContext);
  const user = state.user;

  return (
    <Container className="mt-5 d-flex justify-content-center">
      {user ? (
        <Card className="shadow-lg p-4 rounded" style={{ width: "100%", maxWidth: "600px" }}>
          <Card.Body>
            <Card.Title className="text-center text-primary fs-3 mb-4">Account Profile</Card.Title>

            <Row className="mb-2">
              <Col xs={4}><strong>Name:</strong></Col>
              <Col>{user.name}</Col>
            </Row>

            <Row className="mb-2">
              <Col xs={4}><strong>Username:</strong></Col>
              <Col>{user.username}</Col>
            </Row>

            <Row className="mb-2">
              <Col xs={4}><strong>Email:</strong></Col>
              <Col>{user.email}</Col>
            </Row>

            <Row className="mb-2">
              <Col xs={4}><strong>Phone:</strong></Col>
              <Col>{user.phone}</Col>
            </Row>

            <Row className="mb-2">
              <Col xs={4}><strong>Website:</strong></Col>
              <Col>
                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                  {user.website}
                </a>
              </Col>
            </Row>

            <hr />

            <h5 className="text-secondary mt-3 mb-2">📍 Address</h5>
            <p className="mb-1">{user.address.street}, {user.address.suite}</p>
            <p className="mb-1">{user.address.city}, {user.address.zipcode}</p>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
            </p>

            <hr />

            <h5 className="text-secondary mt-3 mb-2">🏢 Company</h5>
            <p className="mb-1"><strong>{user.company.name}</strong></p>
            <p className="mb-1 fst-italic">"{user.company.catchPhrase}"</p>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              {user.company.bs}
            </p>

            <div className="text-center mt-4">
              <Button variant="outline-primary">Edit Profile</Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading user data...</p>
        </div>
      )}
    </Container>
  );
}

// App chính
export default function Bai4() {
  return (
    <UserProvider>
      <UserDetails />
    </UserProvider>
  );
}


