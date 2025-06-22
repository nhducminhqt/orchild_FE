import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
        // Store the tokens in localStorage
        localStorage.setItem("access_token", response.data.token.access_token);
        localStorage.setItem(
          "refresh_token",
          response.data.token.refresh_token
        );
        localStorage.setItem("token_type", response.data.token.token_type);
        localStorage.setItem("expires", response.data.token.expires);
        localStorage.setItem("isLoggedIn", "true");

        // Set axios default authorization header
        axios.defaults.headers.common[
          "Authorization"
        ] = `${response.data.token.token_type} ${response.data.token.access_token}`;

        // Redirect to home page
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid credentials or server error");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
