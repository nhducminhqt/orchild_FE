import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(90deg, #e0aaff 0%, #b983ff 100%)", color: "#fff" }} className="mt-5 pt-4 pb-2">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5 style={{ color: "#fff" }}>Orchid Shop</h5>
            <p>
              Nơi hội tụ những loài hoa lan đẹp nhất, chất lượng nhất.<br />
              Mang sắc màu thiên nhiên đến không gian của bạn!
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5 style={{ color: "#fff" }}>Liên hệ</h5>
            <ul className="list-unstyled">
              <li>Địa chỉ: 123 Đường Hoa Lan, Quận 1, TP.HCM</li>
              <li>Điện thoại: 0123 456 789</li>
              <li>Email: support@orchidshop.vn</li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5 style={{ color: "#fff" }}>Kết nối với chúng tôi</h5>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
                <i className="bi bi-chat-dots fs-4"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr style={{ borderColor: "#fff", opacity: 0.2 }} />
        <div className="text-center small" style={{ color: "#fff" }}>
          &copy; {new Date().getFullYear()} Orchid Shop. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
