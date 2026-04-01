import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation,Navigate } from "react-router-dom";
import API from "../services/api";
import AuthContext from "../context/AuthContext";
import { useToast } from "../context/ToastProvider";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {showToast} = useToast
  const {accessToken}=useContext(AuthContext);

  const validate = () => {
    if (!fieldInputs.email.trim()) {
      return "Email is required";
    }
  
    // basic email regex (production safe enough)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldInputs.email)) {
      return "Invalid email format";
    }
  
    if (!fieldInputs.password.trim()) {
      return "Password is required";
    }
  
    if (fieldInputs.password.length < 6) {
      return "Password must be at least 6 characters";
    }
  
    return null;
  };

  const [fieldInputs, setFieldInputs] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    if (location.state?.message) {
      setError(location.state.message);
    }
  }, [location.state]);

  const handleInput = (
    e
  ) => {
    const { name, value } = e.target;
    setFieldInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 const validationError = validate();

  if (validationError) {
    setError(validationError);
    showToast(validationError,"danger")
    return;
  }
    try {
      setLoading(true);
      setError("");

      const {data} = await API.post("/api/admin/login", {
        email: fieldInputs.email.toLowerCase(),
        password: fieldInputs.password,
      });

      if(data.success){
        localStorage.setItem("loginEmail",data.email);
        navigate("/admin-verify");
      }

    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if(accessToken){
    return <Navigate to="/admin-page" replace/>
  }
  return (
    <section className="flex-fill d-flex mb-5 justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div
            className={`col-12 col-md-6 col-lg-4 p-4 text-light border rounded shadow-sm ${
              error ? "bg-danger" : ""
            }`}
          >
            <h3 className="mb-4">Admin Login</h3>

            <form onSubmit={handleSubmit}>
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={fieldInputs.email}
                onChange={handleInput}
                className="form-control"
                required
              />

              <label className="form-label mt-3">Password</label>
              <input
                type="password"
                name="password"
                value={fieldInputs.password}
                onChange={handleInput}
                className="form-control"
                required
              />

              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="mt-3">
                {error ? error : "Admin only page"}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;