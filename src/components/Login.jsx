import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const bgStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,rgb(252, 252, 252) 0%, #f3e8ff 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardStyle = {
  border: "none",
  borderRadius: "2rem",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
  background: "rgba(255,255,255,0.95)",
  padding: "2.5rem 2rem 2rem 2rem",
};

const orchidLogo =
  "https://cdn.eva.vn/upload/2-2018/images/2018-06-28/tin-do-hoa-lan-dung-bo-qua-ten-va-hinh-anh-cac-loai-hoa-phong-lan-dep-pho-bien-nhat-3-1530162360-93-width600height450.jpg";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        const decodedToken = jwtDecode(response.data.token.access_token);
        console.log("Decoded token:", decodedToken);

        // Store the tokens and userId in localStorage
        localStorage.setItem("access_token", response.data.token.access_token);
        localStorage.setItem(
          "refresh_token",
          response.data.token.refresh_token
        );
        localStorage.setItem("token_type", response.data.token.token_type);
        localStorage.setItem("expires", response.data.token.expires);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", decodedToken.role); // Store ROLE_ADMIN from token
        if (decodedToken.userId) {
          localStorage.setItem("userId", decodedToken.userId);
        }

        // Set axios default authorization header
        axios.defaults.headers.common[
          "Authorization"
        ] = `${response.data.token.token_type} ${response.data.token.access_token}`;

        // Redirect based on role from decoded token
        if (decodedToken.role === "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (err) {
      setError("Invalid credentials or server error");
      console.error("Login error:", err);
    }
  };
  return (
    <div style={bgStyle}>
      <div className="container" style={{ maxWidth: 420 }}>
        <div style={cardStyle}>
          <div className="text-center mb-4">
            <img
              src={orchidLogo}
              alt="Orchid Shop Logo"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 2px 12px #b983ff55",
              }}
            />
            <h2
              className="mt-3 mb-1"
              style={{ color: "#b983ff", fontWeight: 700, letterSpacing: 1 }}
            >
              Orchid Shop
            </h2>
            <div style={{ color: "#888", fontSize: 16 }}>
              Welcome back! Please login to continue.
            </div>
          </div>
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ borderRadius: "1em", background: "#f3e8ff33" }}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderRadius: "1em", background: "#f3e8ff33" }}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="btn w-100 py-2"
              style={{
                background: "linear-gradient(90deg, #b983ff 0%, #a0e7e5 100%)",
                color: "#fff",
                fontWeight: 600,
                border: "none",
                borderRadius: "1em",
                fontSize: 18,
                boxShadow: "0 2px 8px #b983ff33",
                transition: "background 0.2s",
              }}
            >
              Login
            </button>
            <div className="text-center mt-3">
              <Link
                to="/register"
                className="text-decoration-none"
                style={{ color: "#b983ff", fontWeight: 500 }}
              >
                Do not have an account?{" "}
                <span style={{ textDecoration: "underline" }}>
                  Register here
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
