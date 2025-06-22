import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Button, Col, Image, Modal, Row, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router";

export default function HomeScreen() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [api, setAPI] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseUrl);
      const sortedData = response.data.sort(
        (a, b) => parseInt(b.empId) - parseInt(a.empId)
      );
      setAPI(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-3 g-4">
        {api.map((item) => (
          <Col md={4} key={item.id}>
            <Card>
              <Card.Img
                variant="top"
                src={item.image}
                alt="example"
                height={350}
              />
              <Card.Body>
                <Card.Title>{item.orchidName}</Card.Title>

                <Link to={`/detail/${item.id}`}>
                  {" "}
                  <Button variant="primary">Detail</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
