import PropTypes from "prop-types";
import { Modal, Button, Table, Badge } from "react-bootstrap";

function OrderDetailModal({ show, onHide, order }) {
  if (!order) return null;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table borderless size="sm">
          <tbody>
            <tr>
              <th>Order ID:</th>
              <td>{order.id}</td>
            </tr>
            <tr>
              <th>Total Amount:</th>
              <td>${order.totalAmount}</td>
            </tr>
            <tr>
              <th>Order Date:</th>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
            </tr>
            <tr>
              <th>Status:</th>
              <td>
                <Badge
                  bg={order.orderStatus === "PENDING" ? "warning" : "success"}
                  text={order.orderStatus === "PENDING" ? "dark" : "light"}
                >
                  {order.orderStatus}
                </Badge>
              </td>
            </tr>
            <tr>
              <th>Address:</th>
              <td>{order.address}</td>
            </tr>
            <tr>
              <th>Phone:</th>
              <td>{order.phoneNumber}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

OrderDetailModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  order: PropTypes.shape({
    id: PropTypes.string,
    totalAmount: PropTypes.number,
    orderDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    orderStatus: PropTypes.string,
    address: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};

export default OrderDetailModal;
