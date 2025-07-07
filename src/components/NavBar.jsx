import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdmin = localStorage.getItem("userRole") === "ROLE_ADMIN";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="orchid-navbar shadow-sm py-2">
      <Container>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="orchid-navbar-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto orchid-navbar-nav">
            <Navbar.Brand
              as={Link}
              to="/homepage"
              className="orchid-navbar-brand d-flex align-items-center"
            >
              <img
                src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-flower-pink-logo-png-image_5339951.jpg"
                alt="Orchid Garden Logo"
                className="brand-logo me-2"
                style={{
                  height: 40,
                  width: 40,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <span
                className="fw-bold orchid-navbar-title"
                style={{ color: "#b983ff", fontSize: 22 }}
              >
                Orchid Garden
              </span>
            </Navbar.Brand>
            <Nav.Link as={Link} to="/home" className="orchid-navbar-link">
              Orchid
            </Nav.Link>
            {isLoggedIn && (
              <>
                <Nav.Link
                  as={Link}
                  to="/my-orders"
                  className="orchid-navbar-link"
                >
                  My Orders
                </Nav.Link>
                {isAdmin && (
                  <Nav.Link
                    as={Link}
                    to="/admin/dashboard"
                    className="orchid-navbar-link"
                  >
                    Admin Dashboard
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav className="orchid-navbar-auth">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <span className="navbar-text me-3 orchid-navbar-admin">
                    <i className="bi bi-person-fill"></i> Admin
                  </span>
                )}
                <Nav.Link
                  onClick={handleLogout}
                  className="orchid-navbar-link orchid-navbar-link-logout"
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="orchid-navbar-link">
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className="orchid-navbar-link"
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
