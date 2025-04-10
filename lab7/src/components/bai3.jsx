import React, { useReducer } from "react";
import { Button, Container } from "react-bootstrap";

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return { ...state, name: action.payload };
    case "CHANGE_AGE":
      return { ...state, age: action.payload };
    default:
      return state;
  }
};

// Main component
export default function Bai3() {
  const [user, dispatch] = useReducer(userReducer, { 
    name: "Tony Nguyen", 
    age: 20
  });

  return (
    <Container className="mt-5 text-center">
      <h2>Name: {user.name}</h2>
      <h3>Age: {user.age}</h3>

      <div className="mt-3">
        <Button
          variant="primary"
          onClick={() => dispatch({ 
            type: "CHANGE_NAME", 
            payload: "Tony Thuy Tu" 
          })}
        >
          Change Name to another name
        </Button>

        <Button
          variant="secondary"
          onClick={() => dispatch({ 
            type: "CHANGE_AGE", 
            payload: 21
          })}
          className="ms-2"
        >
          Change Age to 21
        </Button>
      </div>
    </Container>
  );
}
