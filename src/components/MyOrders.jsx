import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Container, Table, Alert, Spinner, Badge } from "react-bootstrap";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const accountId = localStorage.getItem("userId");
        const response = await axiosInstance.get(
          `/orders/my-orders?accountId=${accountId}`
        );
        setOrders(response.data);
      } catch {
        setError("Failed to load your orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4" style={{ color: "#b983ff" }}>
        My Orders
      </h2>
      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && orders.length === 0 && (
        <Alert variant="info">You have no orders yet.</Alert>
      )}
      {!loading && !error && orders.length > 0 && (
        <Table bordered hover responsive className="shadow-sm">
          <thead style={{ background: "#f3e8ff" }}>
            <tr>
              <th>#</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order.id}>
                <td>{idx + 1}</td>
                <td>${order.totalAmount}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>
                  <Badge
                    bg={order.orderStatus === "PENDING" ? "warning" : "success"}
                    text={order.orderStatus === "PENDING" ? "dark" : "light"}
                  >
                    {order.orderStatus}
                  </Badge>
                </td>
                <td>{order.address}</td>
                <td>{order.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
