import { Nav, Navbar, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
    return (
       <Navbar
  expand="lg"
  bg="dark"
  variant="dark"
  fixed="top"
  
>
  <Container>
    <Navbar.Brand as={Link} to="/">
      <div className="d-flex align-items-center">
        <Image height={40} className="me-2" src="/logos/tn-logo-2.png" />
        <span className="fw-bold">District Central Library</span>
      </div>
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="main-navbar" />

    <Navbar.Collapse id="main-navbar">
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
        <Nav.Link as={Link} to="/book">Books</Nav.Link>
        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        <Nav.Link as={Link} to="/admin-login">Admin</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    );
};

export default NavigationBar;
