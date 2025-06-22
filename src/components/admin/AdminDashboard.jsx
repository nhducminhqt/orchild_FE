import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card
            className="h-100 cursor-pointer"
            onClick={() => navigate("/admin/categories")}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <Card.Title>Category Management</Card.Title>
              <Card.Text>
                Manage orchid categories, add, edit, or remove categories
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card
            className="h-100"
            onClick={() => navigate("/admin/orchids")}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <Card.Title>Orchid Management</Card.Title>
              <Card.Text>
                Manage orchids, their details, prices, and inventory
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card
            className="h-100"
            onClick={() => navigate("/admin/users")}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <Card.Title>User Management</Card.Title>
              <Card.Text>Manage user accounts and permissions</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
