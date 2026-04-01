import { useState, useContext } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import { useToast } from "../context/ToastProvider";
// import { useToast } from "../context/ToastContext";
import API from "../services/api";

const LogoutButton = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser, setAccessToken,accessToken } = useContext(AuthContext);
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      setLoading(true);

      // ✅ validation
      const token = accessToken;
      if (!token) {
        showToast("No active session", "warning");
        return navigate("/admin-login");
      }

      // ✅ API call
      const { data } = await API.post("/api/admin/logout");

      if (data.success) {
        // ✅ cleanup
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("loginEmail");

        showToast("Logged out successfully", "success");

        navigate("/admin-login");
      }
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Logout failed",
        "danger"
      );
    } finally {
      setLoading(false);
      setShow(false);
    }
  };

  return (
    <>
      {/* 🔥 Main Button */}
      <Button variant="danger" onClick={() => setShow(true)}>
        Logout
      </Button>

      {/* 🔥 Confirmation Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShow(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Logout"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutButton;