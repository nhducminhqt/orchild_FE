import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import "../css/HomeScreen.css";

export default function HomeScreen() {
  const [orchids, setOrchids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrchids();
  }, []);

  const fetchOrchids = async () => {
    try {
      const response = await axiosInstance.get("/orchids");
      setOrchids(response.data);
    } catch (error) {
      console.error("Error fetching orchids:", error);
      setError("Failed to load orchids");
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4 orchid-collection-title">
        Our Orchid Collection
      </h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Row className="g-4">
        {orchids.map((orchid) => (
          <Col key={orchid.id} xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm orchid-card">
              <div style={{ height: "250px", overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={orchid.url}
                  alt={orchid.name}
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{orchid.name}</Card.Title>
                <Card.Text className="text-truncate">
                  {orchid.description}
                </Card.Text>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="h5 mb-0 orchid-price">
                      ${orchid.price}
                    </span>
                    <span className="badge badge-category">
                      {orchid.category.name}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      className={
                        "badge badge-gradient " +
                        (orchid.natural ? "badge-natural" : "badge-hybrid")
                      }
                      style={
                        orchid.natural
                          ? {
                              background:
                                "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                              color: "#fff",
                              fontWeight: 600,
                            }
                          : {
                              background:
                                "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                              color: "#fff",
                              fontWeight: 600,
                            }
                      }
                    >
                      {orchid.natural ? "Natural" : "Hybrid"}
                    </span>
                    <Link to={`/detail/${orchid.id}`} className="btn btn-pink">
                      View Details
                    </Link>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
