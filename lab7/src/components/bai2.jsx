import React, { createContext, useState, useContext } from "react";
import { Button, Container } from "react-bootstrap";

// Create user context
const UserContext = createContext();

// Context provider component
function UserProvider({ children }) {
  const [user, setUser] = useState({ 
    name: "Tony Nguyen", 
    age: 20
  });

  const changeName = (newName) => {
    setUser(prevUser => ({
      ...prevUser,
      name: newName
    }));
  };

  const changeAge = (newAge) => {
    setUser(prevUser => ({
      ...prevUser,
      age: newAge
    }));
  };

  return (
    <UserContext.Provider value={{ user, changeName, changeAge }}>
      {children}
    </UserContext.Provider>
  );
}

// Component that displays and updates user details
function UserDetails() {
  const { user, changeName, changeAge } = useContext(UserContext);

  return (
    <Container className="mt-5 text-center">
      <h2>Name: {user.name}</h2>
      <h3>Age: {user.age}</h3>

      <div className="mt-3">
        <Button 
          variant="primary" 
          onClick={() => changeName("Tony Thuy Tu")}
        >
          Change Name to another name
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={() => changeAge(21)} 
          className="ms-2"
        >
          Change Age to 21
        </Button>
      </div>
    </Container>
  );
}

// Main component
export default function Bai2() {
  return (
    <UserProvider>
      <UserDetails />
    </UserProvider>
  );
}

