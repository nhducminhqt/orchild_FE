import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

function AdminSidebar({ active }) {
  const navigate = useNavigate();
  return (
    <div
      className="admin-sidebar d-flex flex-column p-3"
      style={{ minHeight: "100vh", background: "#f3e8ff", minWidth: 220 }}
    >
      <h4 className="mb-4" style={{ color: "#b983ff" }}>
        Admin Panel
      </h4>
      <Nav variant="pills" className="flex-column gap-2">
        <Nav.Item>
          <Nav.Link
            active={active === "dashboard"}
            onClick={() => navigate("/admin/dashboard")}
          >
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={active === "categories"}
            onClick={() => navigate("/admin/categories")}
          >
            Category Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={active === "orchids"}
            onClick={() => navigate("/admin/orchids")}
          >
            Orchid Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={active === "accounts"}
            onClick={() => navigate("/admin/accounts")}
          >
            User Management
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

AdminSidebar.propTypes = {
  active: PropTypes.string,
};

export default AdminSidebar;
