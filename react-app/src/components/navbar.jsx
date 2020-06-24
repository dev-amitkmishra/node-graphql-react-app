import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const navBar = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Graphql-App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" defaultActiveKey="/#">
                    <Nav.Link href="/#">Login</Nav.Link>
                    <Nav.Link href="/#signup">Signup</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default navBar;