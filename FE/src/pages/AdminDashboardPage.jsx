import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
    AddAdmins,
    BookUpdates,
    BorrowUpdates,
    // Notification,
} from "../components/AdminComponents";
import BorrowRecordsPage from "./BorrowRecordsPage";
import NotifyBorrowers from "./NotifyBorrowers";
import ReportsPage from "./ReportsPage";
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
                                Borrow Records
                            </Nav.Link>
                            <Nav.Link onClick={() => setActiveSection("4")}>
                                Notify Borrowers
                            </Nav.Link>
                            <Nav.Link onClick={() => setActiveSection("5")}>
                                Reports
                            </Nav.Link>
                            <Nav.Link onClick={() => setActiveSection("6")}>
                                Add Admin
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <div className=" mt-3">
                    {activeSection === "1" && <BookUpdates />}
                    {activeSection === "2" && <BorrowUpdates />}
                    {activeSection === "3" && <BorrowRecordsPage />}
                    {activeSection === "4" && <NotifyBorrowers />}
                    {activeSection === "5" && <ReportsPage />}
                    {activeSection === "6" && <AddAdmins/>}
                </div>
            </section>
        </>
    );
};

export default AdminDashboard;
