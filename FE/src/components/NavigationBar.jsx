import { Nav, Navbar, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <Navbar
            expand="lg"
            bg="dark"
            data-bs-theme="dark"
            fixed="top"
            className=" nav-color text-light "
        >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <div className=" flex-center">
                        <Image
                            height={40}
                            className="me-2"
                            src="/logos/tn-logo-2.png"
                        />
                        <p className=" m-0 fw-bold">District Central Library</p>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="Navbar-nav" />

                <Navbar.Collapse id="Navbar-nav">
                    <Nav className=" ms-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about">
                            About us
                        </Nav.Link>
                        <Nav.Link as={Link} to="/book">
                            Books
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact">
                            Contact
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin-login">
                            Admin
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
