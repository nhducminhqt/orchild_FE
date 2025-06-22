import { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import axiosInstance from "../../axiosInstance";

function OrchidManagement() {
  const [orchids, setOrchids] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    imageUrl: "",
    categoryId: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchOrchids();
    fetchCategories();
  }, []);

  const fetchOrchids = async () => {
    try {
      const response = await axiosInstance.get("/orchids");
      setOrchids(response.data);
    } catch (err) {
      console.error("Error fetching orchids:", err);
      setError("Failed to fetch orchids");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === "add") {
        await axiosInstance.post("/orchids", formData);
        setSuccess("Orchid created successfully");
      } else {
        await axiosInstance.put(`/orchids/${selectedOrchid.id}`, formData);
        setSuccess("Orchid updated successfully");
      }
      handleClose();
      fetchOrchids();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this orchid?")) {
      try {
        await axiosInstance.delete(`/orchids/${id}`);
        setSuccess("Orchid deleted successfully");
        fetchOrchids();
      } catch (err) {
        console.error("Error deleting orchid:", err);
        setError(err.response?.data?.message || "Delete failed");
      }
    }
  };
  const handleClose = () => {
    setShowModal(false);
    setFormData({
      name: "",
      description: "",
      price: "",
      stockQuantity: "",
      imageUrl: "",
      categoryId: "",
    });
    setSelectedOrchid(null);
    setError("");
  };

  const handleEdit = (orchid) => {
    setSelectedOrchid(orchid);
    setFormData({
      name: orchid.name,
      description: orchid.description,
      price: orchid.price,
      stockQuantity: orchid.stockQuantity,
      imageUrl: orchid.imageUrl,
      categoryId: orchid.categoryId,
    });
    setModalMode("edit");
    setShowModal(true);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Orchid Management</h2>

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
        Add New Orchid
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orchids.map((orchid) => (
            <tr key={orchid.id}>
              <td>{orchid.name}</td>
              <td>{orchid.description}</td>
              <td>${orchid.price}</td>
              <td>{orchid.stockQuantity}</td>
              <td>
                {categories.find((c) => c.id === orchid.categoryId)?.name ||
                  "N/A"}
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(orchid)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(orchid.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "add" ? "Add New Orchid" : "Edit Orchid"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                value={formData.stockQuantity}
                onChange={(e) =>
                  setFormData({ ...formData, stockQuantity: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {modalMode === "add" ? "Add Orchid" : "Update Orchid"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default OrchidManagement;
