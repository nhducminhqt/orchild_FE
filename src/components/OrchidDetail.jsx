import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import axiosInstance from "../axiosInstance";

export default function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orchid, setOrchid] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Order modal state (must be before any return)
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderAddress, setOrderAddress] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    const fetchOrchidDetail = async () => {
      try {
        const response = await axiosInstance.get(`/orchids/${id}`);
        setOrchid(response.data);
      } catch (err) {
        console.error("Error fetching orchid details:", err);
        setError("Failed to load orchid details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrchidDetail();
  }, [id]);

  // Early returns must be after all hooks
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

  // Order modal handlers (no duplicate hooks)
  const handleBuyNow = () => {
    setShowOrderModal(true);
    setOrderError(null);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrderLoading(true);
    setOrderError(null);
    // TODO: Replace with actual accountId from auth context
    const accountId = "string";
    const totalAmount = orchid ? orchid.price * orderQuantity : 0;
    const orderData = {
      totalAmount,
      orderDate: new Date().toISOString(),
      orderStatus: "PENDING",
      accountId,
      address: orderAddress,
      phoneNumber: orderPhone,
    };
    try {
      await axiosInstance.post("/orders", orderData);
      setShowOrderModal(false);
    } catch {
      setOrderError("Failed to place order. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

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
                <Button variant="primary" size="lg" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </div>

              {/* Order Modal */}
              <Modal
                show={showOrderModal}
                onHide={() => setShowOrderModal(false)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Place Order</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleOrderSubmit}>
                  <Modal.Body>
                    {orderError && <Alert variant="danger">{orderError}</Alert>}
                    <Form.Group className="mb-3" controlId="orderQuantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        value={orderQuantity}
                        onChange={(e) =>
                          setOrderQuantity(Number(e.target.value))
                        }
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="orderAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        value={orderAddress}
                        onChange={(e) => setOrderAddress(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="orderPhone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        value={orderPhone}
                        onChange={(e) => setOrderPhone(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowOrderModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={orderLoading}
                    >
                      {orderLoading ? "Placing..." : "Confirm Order"}
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
