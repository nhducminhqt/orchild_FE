import { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";

function AccountManagement() {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axiosInstance.get("/accounts");
      setAccounts(response.data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
      setError("Failed to fetch accounts");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === "add") {
        await axiosInstance.post("/accounts/register", formData);
        setSuccess("Account created successfully");
      } else {
        const updateData = { ...formData };
        delete updateData.password; // Remove password for update
        await axiosInstance.put(`/accounts/${selectedAccount.id}`, updateData);
        setSuccess("Account updated successfully");
      }
      handleClose();
      fetchAccounts();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        await axiosInstance.delete(`/accounts/${id}`);
        setSuccess("Account deleted successfully");
        fetchAccounts();
      } catch (err) {
        console.error("Error deleting account:", err);
        setError(err.response?.data?.message || "Delete failed");
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ name: "", email: "", password: "" });
    setSelectedAccount(null);
    setError("");
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setFormData({
      name: account.name,
      email: account.email,
      password: "", // Clear password field for edit
    });
    setModalMode("edit");
    setShowModal(true);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Account Management</h2>

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
        Add New Account
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>{account.email}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(account)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(account.id)}
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
            {modalMode === "add" ? "Add New Account" : "Edit Account"}
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Form.Group>
            {(modalMode === "add" || selectedAccount) && (
              <Form.Group className="mb-3">
                <Form.Label>
                  {modalMode === "add" ? "Password" : "New Password (optional)"}
                </Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required={modalMode === "add"}
                />
              </Form.Group>
            )}
            <Button variant="primary" type="submit">
              {modalMode === "add" ? "Add Account" : "Update Account"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AccountManagement;
