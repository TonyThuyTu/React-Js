import React, { createContext, useState, useContext } from "react";
import { Button, Container } from "react-bootstrap";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "Tony Nguyen" });

  const changeName = (newName) => {
    setUser({ name: newName });
  };

  return (
    <UserContext.Provider value={{ user, changeName }}>
      {children}
    </UserContext.Provider>
  );
}

function Profile() {
  const { user, changeName } = useContext(UserContext);

  return (
    <Container className="mt-5 text-center">
      <h2>{`Hello, ${user.name}`}</h2>
      <Button 
        variant="primary" 
        onClick={() => changeName("Tony Thuy Tu")}
      >
        Change Name to Tony Thuy Tu
      </Button>
    </Container>
  );
}

export default function Bai1() {
  return (
    <UserProvider>
      <Profile />
    </UserProvider>
  );
}