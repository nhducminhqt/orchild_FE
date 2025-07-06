import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdmin = localStorage.getItem("userRole") === "ROLE_ADMIN";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/homepage">
              Trang chủ
            </Nav.Link>
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <Nav.Link as={Link} to="/admin/dashboard">
                    Admin Dashboard
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <span className="navbar-text me-3">
                    <i className="bi bi-person-fill"></i> Admin
                  </span>
                )}
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
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
