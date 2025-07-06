import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLeaf,
  FaClock,
  FaHeart,
} from "react-icons/fa";
import { useState } from "react";
import "../css/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("Cảm ơn bạn đã đăng ký nhận tin tức!");
    setEmail("");
  };

  return (
    <footer className="custom-footer py-5 mt-auto">
      <Container>
        <Row>
          {/* Brand & Description */}
          <Col lg={4} md={6} className="mb-4">
            <div className="footer-brand">
              <FaLeaf className="footer-brand-icon" />
              Orchid Garden
            </div>
            <p className="footer-description">
              Khám phá vẻ đẹp thiên nhiên với bộ sưu tập hoa lan tuyệt đẹp của
              chúng tôi. Chúng tôi mang đến những chậu hoa lan chất lượng cao
              nhất và dịch vụ chăm sóc chuyên nghiệp.
            </p>

            {/* Social Links */}
            <div className="social-links">
              <a href="#" className="social-link" title="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-link" title="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" title="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" title="YouTube">
                <FaYoutube />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="footer-section-title">Liên Kết Nhanh</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="footer-link">
                  Trang Chủ
                </a>
              </li>
              <li className="mb-2">
                <a href="/home" className="footer-link">
                  Xem Hoa Lan
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">
                  Về Chúng Tôi
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">
                  Liên Hệ
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">
                  Blog
                </a>
              </li>
            </ul>
          </Col>

          {/* Services */}
          <Col lg={3} md={6} className="mb-4">
            <h6 className="footer-section-title">Dịch Vụ</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="footer-link">
                  Chăm Sóc Hoa Lan
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">
                  Tư Vấn Miễn Phí
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">
                  Giao Hàng Tận Nơi
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">
                  Bảo Hành & Bảo Trì
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">
                  Thiết Kế Vườn Lan
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact & Newsletter */}
          <Col lg={3} md={6} className="mb-4">
            <h6 className="footer-section-title">Liên Hệ</h6>

            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span className="contact-text">
                123 Đường Hoa Lan, Quận 1, TP.HCM
              </span>
            </div>

            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span className="contact-text">+84 901 234 567</span>
            </div>

            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span className="contact-text">info@orchidgarden.vn</span>
            </div>

            <div className="contact-item">
              <FaClock className="contact-icon" />
              <span className="contact-text">T2-CN: 8:00 - 20:00</span>
            </div>

            {/* Newsletter */}
            <div className="newsletter-section">
              <h6 className="newsletter-title">Đăng Ký Nhận Tin</h6>
              <p className="newsletter-description">
                Nhận thông tin về hoa lan mới và ưu đãi đặc biệt
              </p>
              <Form
                onSubmit={handleNewsletterSubmit}
                className="newsletter-form"
              >
                <Form.Control
                  type="email"
                  placeholder="Email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <Button type="submit" className="newsletter-btn">
                  Đăng Ký
                </Button>
              </Form>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />

        {/* Footer Bottom */}
        <Row className="footer-bottom align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="footer-copyright">
              © {currentYear} Orchid Garden. Tất cả quyền được bảo lưu.
              <FaHeart
                className="text-danger mx-1"
                style={{ fontSize: "0.8rem" }}
              />
              Được tạo với tình yêu.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="footer-legal-links">
              <a href="#" className="footer-legal-link">
                Chính Sách Bảo Mật
              </a>
              <a href="#" className="footer-legal-link">
                Điều Khoản Dịch Vụ
              </a>
              <a href="#" className="footer-legal-link">
                Chính Sách Cookie
              </a>
            </p>
          </Col>
        </Row>

        {/* Decorative Elements */}
        <div
          className="footer-sparkle"
          style={{ top: "20%", left: "10%", animationDelay: "0s" }}
        ></div>
        <div
          className="footer-sparkle"
          style={{ top: "60%", right: "20%", animationDelay: "1s" }}
        ></div>
        <div
          className="footer-sparkle"
          style={{ bottom: "30%", left: "80%", animationDelay: "2s" }}
        ></div>
      </Container>
    </footer>
  );
}

export default Footer;
