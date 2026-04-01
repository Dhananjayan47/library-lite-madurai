// context/ToastContext.jsx
import { createContext, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success"
  });

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* 🔥 Global Toast UI */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={toast.show}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
          delay={3000}
          autohide
          bg={toast.variant}
        >
          <Toast.Body className="text-white">
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);