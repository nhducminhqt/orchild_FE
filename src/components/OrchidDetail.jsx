import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import axiosInstance from "../axiosInstance";

export default function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orchid, setOrchid] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrchidDetail();
  }, [id]);

  const fetchOrchidDetail = async () => {
    try {
      const response = await axiosInstance.get(`/orchids/${id}`);
      setOrchid(response.data);
    } catch (error) {
      console.error("Error fetching orchid details:", error);
      setError("Failed to load orchid details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">Loading...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!orchid) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">Orchid not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </Button>

      <Row>
        <Col md={6}>
          <div className="position-relative" style={{ height: "400px" }}>
            <img
              src={orchid.url}
              alt={orchid.name}
              className="img-fluid rounded shadow"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </Col>

        <Col md={6}>
          <Card className="border-0">
            <Card.Body>
              <h2 className="mb-3">{orchid.name}</h2>

              <div className="mb-4">
                <h4 className="text-primary mb-2">${orchid.price}</h4>
                <div className="d-flex gap-2 mb-3">
                  <span className="badge bg-secondary">
                    {orchid.category.name}
                  </span>
                  <span className="badge bg-info">
                    {orchid.natural ? "Natural" : "Hybrid"}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h5>Description</h5>
                <p className="text-muted">
                  {orchid.description || "No description available"}
                </p>
              </div>

              <div className="d-grid gap-2">
                <Button variant="primary" size="lg">
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
