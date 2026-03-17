import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
    BookUpdates,
    BorrowUpdates,
    Notification,
} from "../components/AdminComponents";
const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState("1");

    return (
        <>
            <Navbar
                expand="lg"
                bg="dark"
                data-bs-theme="dark"
                fixed="bottom"
                className=" nav-color text-light "
            >
                <Container>
                    <Navbar.Brand>
                        <div className=" flex-center">
                            <p className=" m-0 fw-bold">Admin Navbar</p>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="Navbar-nav" />

                    <Navbar.Collapse id="Navbar-nav">
                        <Nav className=" ms-auto">
                            <Nav.Link onClick={() => setActiveSection("1")}>
                                Book Updates
                            </Nav.Link>
                            <Nav.Link onClick={() => setActiveSection("2")}>
                                Borrow Updates
                            </Nav.Link>
                            <Nav.Link onClick={() => setActiveSection("3")}>
                                Notification
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <div className=" mt-4">
                    {activeSection === "1" && <BookUpdates />}
                    {activeSection === "2" && <BorrowUpdates />}
                    {activeSection === "3" && <Notification />}
                </div>
            </section>
        </>
    );
};

export default AdminDashboard;
