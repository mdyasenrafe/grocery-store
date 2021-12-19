import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";

const NavBar = () => {
  // use auth
  const { user, logOut } = UseAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img src="https://i.ibb.co/ZghmB82/large.png" alt="" srcset="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>

            {user?.displayName ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  DashBoard
                </Nav.Link>
                <span>{user?.displayName}</span>
                <button className="btn bg-red" onClick={logOut}>
                  Logout
                </button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                Log in
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
