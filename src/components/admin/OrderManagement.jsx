import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import AdminSidebar from "./AdminSidebar";
import axiosInstance from "../../axiosInstance";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    totalAmount: 0,
    orderDate: new Date().toISOString(),
    orderStatus: "PENDING",
    accountId: "",
    address: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders");
      setOrders(response.data);
    } catch {
      setError("Failed to fetch orders");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let submitData = { ...formData };
      // Convert orderDate from ISO string to timestamp (number)
      if (formData.orderDate) {
        submitData.orderDate = new Date(formData.orderDate).getTime();
      }
      if (modalMode === "add") {
        await axiosInstance.post("/orders", submitData);
        setSuccess("Order created successfully");
      } else {
        await axiosInstance.put(`/orders/${selectedOrder.id}`, submitData);
        setSuccess("Order updated successfully");
      }
      handleClose();
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axiosInstance.delete(`/orders/${id}`);
        setSuccess("Order deleted successfully");
        fetchOrders();
      } catch (err) {
        setError(err.response?.data?.message || "Delete failed");
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      totalAmount: 0,
      orderDate: new Date().toISOString(),
      orderStatus: "PENDING",
      accountId: "",
      address: "",
      phoneNumber: "",
    });
    setSelectedOrder(null);
    setError("");
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    // Convert orderDate (timestamp) to ISO string for datetime-local input
    let orderDateStr = "";
    if (order.orderDate) {
      if (typeof order.orderDate === "number") {
        // Convert timestamp to ISO string
        orderDateStr = new Date(order.orderDate).toISOString();
      } else if (typeof order.orderDate === "string" && !isNaN(Number(order.orderDate))) {
        // If string but is a number
        orderDateStr = new Date(Number(order.orderDate)).toISOString();
      } else {
        // Assume it's already ISO string
        orderDateStr = order.orderDate;
      }
    } else {
      orderDateStr = new Date().toISOString();
    }
    setFormData({
      totalAmount: order.totalAmount,
      orderDate: orderDateStr,
      orderStatus: order.orderStatus,
      accountId: order.accountId,
      address: order.address,
      phoneNumber: order.phoneNumber,
    });
    setModalMode("edit");
    setShowModal(true);
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#fff" }}>
      <AdminSidebar active="orders" />
      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Order Management</h2>
        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" onClose={() => setSuccess("")} dismissible>
            {success}
          </Alert>
        )}
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => {
            setModalMode("add");
            setShowModal(true);
          }}
        >
          Add New Order
        </Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Account ID</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>${order.totalAmount}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.25em 0.75em",
                      borderRadius: "1em",
                      color: "#fff",
                      background:
                        order.orderStatus === "PENDING"
                          ? "#ffc107" // vàng
                          : order.orderStatus === "PROCESSING"
                          ? "#17a2b8" // xanh dương nhạt
                          : order.orderStatus === "COMPLETED"
                          ? "#28a745" // xanh lá
                          : order.orderStatus === "CANCELLED"
                          ? "#dc3545" // đỏ
                          : "#6c757d", // xám
                    }}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td>{order.accountId}</td>
                <td>{order.address}</td>
                <td>{order.phoneNumber}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(order)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalMode === "add" ? "Add New Order" : "Edit Order"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Total Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, totalAmount: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Order Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formData.orderDate ? new Date(formData.orderDate).toISOString().slice(0, 16) : ""}
                  onChange={(e) =>
                    setFormData({ ...formData, orderDate: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={formData.orderStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, orderStatus: e.target.value })
                  }
                  required
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Account ID</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.accountId}
                  onChange={(e) =>
                    setFormData({ ...formData, accountId: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {modalMode === "add" ? "Add Order" : "Update Order"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default OrderManagement;
