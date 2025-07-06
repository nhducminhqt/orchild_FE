import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Home.css";

export default function Home() {
  const [featuredOrchids, setFeaturedOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchFeaturedOrchids();
  }, []);

  const fetchFeaturedOrchids = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await axios.get("http://localhost:8080/api/orchids", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Get first 6 orchids for featured section
      setFeaturedOrchids(response.data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching orchids:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("Cảm ơn bạn đã đăng ký nhận tin tức!");
    setEmail("");
  };

  const orchidCategories = [
    {
      name: "Hoa Lan Tự Nhiên",
      description: "Những loài hoa lan tự nhiên quý hiếm",
      image:
        "https://file.hstatic.net/200000455983/file/hoa-lan_038806fb332840c7a4c128c0b5dd6592_grande.png",
      count: "10+ loại",
    },
    {
      name: "Hoa Lan Công Nghiệp",
      description: "Hoa lan lai tạo chất lượng cao",
      image:
        "https://hoachanthat.com/wp-content/uploads/2024/11/tong-hop-10-loai-hoa-lan-quy-tai-vn-1.jpg",
      count: "20+ loại",
    },
    {
      name: "Hoa Lan Chậu",
      description: "Hoa lan trong chậu trang trí",
      image:
        "https://guitanghoa.com/wp-content/uploads/2021/01/hoa-lan-ho-diep.jpg",
      count: "20+ loại",
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Thị Mai",
      text: "Shop có những chậu hoa lan tuyệt đẹp, chất lượng rất tốt. Tôi rất hài lòng!",
      rating: 5,
    },
    {
      name: "Trần Văn Nam",
      text: "Dịch vụ chăm sóc khách hàng tuyệt vời, hoa lan được đóng gói cẩn thận.",
      rating: 5,
    },
    {
      name: "Lê Thị Hương",
      text: "Đã mua nhiều lần ở đây, hoa lan luôn tươi và đúng mô tả.",
      rating: 5,
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">
                  Vườn Lan <span className="text-primary">Thiên Đường</span>
                </h1>
                <p className="hero-subtitle">
                  Khám phá bộ sưu tập hoa lan đẹp nhất với hơn 100 loài khác
                  nhau. Chúng tôi mang đến cho bạn những chậu hoa lan chất lượng
                  cao nhất.
                </p>
                <div className="hero-buttons">
                  <Link to="/home">
                    <Button size="lg" className="me-3 custom-btn-primary">
                      Khám Phá Ngay
                    </Button>
                  </Link>
                  <Button
                    variant="outline-primary"
                    size="lg"
                    className="custom-btn-outline"
                  >
                    Liên Hệ Tư Vấn
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <img
                  src="https://bizweb.dktcdn.net/100/110/079/files/vuon-lan-ho-diep-tai-ha-noi-ban-si-va-le-gia-vuon.jpg?v=1563295239029"
                  alt="Beautiful Orchids"
                  className="img-fluid rounded-3 shadow-lg"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Orchids Section */}
      <section className="featured-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Hoa Lan Nổi Bật</h2>
            <p className="section-subtitle">
              Những loài hoa lan được yêu thích nhất
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <Row className="g-4">
              {featuredOrchids.map((orchid) => (
                <Col md={6} lg={4} key={orchid.orchidId}>
                  <Card className="orchid-card h-100">
                    <div className="card-image-wrapper">
                      <Card.Img
                        variant="top"
                        src={orchid.orchidUrl}
                        alt={orchid.orchidName}
                        className="orchid-image"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x250?text=Orchid+Image";
                        }}
                      />
                      <Badge
                        bg={orchid.isNatural ? "success" : "warning"}
                        className="position-absolute top-0 start-0 m-2"
                      >
                        {orchid.isNatural ? "Tự Nhiên" : "Lai Tạo"}
                      </Badge>
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="orchid-name">
                        {orchid.orchidName}
                      </Card.Title>
                      <Card.Text className="orchid-description flex-grow-1">
                        {orchid.orchidDescription?.length > 100
                          ? orchid.orchidDescription.substring(0, 100) + "..."
                          : orchid.orchidDescription}
                      </Card.Text>

                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className="price-tag">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(orchid.price)}
                        </span>
                        <Link to={`/detail/${orchid.orchidId}`}>
                          <Button
                            variant="primary"
                            size="sm"
                            className="custom-btn-sm"
                          >
                            Xem Chi Tiết
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          <div className="text-center mt-4">
            <Link to="/home">
              <Button variant="outline-primary" size="lg">
                Xem Tất Cả Hoa Lan
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Danh Mục Sản Phẩm</h2>
            <p className="section-subtitle">
              Tìm kiếm theo loại hoa lan bạn yêu thích
            </p>
          </div>

          <Row className="g-4">
            {orchidCategories.map((category, index) => (
              <Col md={4} key={index}>
                <Card className="category-card h-100 text-center">
                  <div className="category-image-wrapper">
                    <Card.Img
                      variant="top"
                      src={category.image}
                      alt={category.name}
                      className="category-image"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="category-name">
                      {category.name}
                    </Card.Title>
                    <Card.Text className="category-description">
                      {category.description}
                    </Card.Text>
                    <Badge bg="primary" className="category-count">
                      {category.count}
                    </Badge>
                    <div className="mt-3">
                      <Link to="/home">
                        <Button variant="outline-primary" className="w-100">
                          Khám Phá
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="about-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="about-content">
                <h2 className="section-title text-start">Về Chúng Tôi</h2>
                <p className="about-text">
                  Với hơn 10 năm kinh nghiệm trong việc trồng và chăm sóc hoa
                  lan, chúng tôi tự hào là một trong những nhà cung cấp hoa lan
                  uy tín nhất tại Việt Nam.
                </p>
                <p className="about-text">
                  Chúng tôi cam kết mang đến cho khách hàng những chậu hoa lan
                  chất lượng cao nhất, được chăm sóc tỉ mỉ từ khâu gieo trồng
                  đến khi giao hàng.
                </p>
                <div className="about-stats">
                  <Row>
                    <Col xs={4}>
                      <div className="stat-item">
                        <h3 className="stat-number">100+</h3>
                        <p className="stat-label">Loài Hoa Lan</p>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="stat-item">
                        <h3 className="stat-number">5000+</h3>
                        <p className="stat-label">Khách Hàng</p>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="stat-item">
                        <h3 className="stat-number">10+</h3>
                        <p className="stat-label">Năm Kinh Nghiệm</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-image">
                <img
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop"
                  alt="About Us"
                  className="img-fluid rounded-3 shadow"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Khách Hàng Nói Gì</h2>
            <p className="section-subtitle">
              Những đánh giá chân thực từ khách hàng
            </p>
          </div>

          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col md={4} key={index}>
                <Card className="testimonial-card h-100">
                  <Card.Body className="text-center">
                    <div className="testimonial-stars mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-warning">
                          ★
                        </span>
                      ))}
                    </div>
                    <Card.Text className="testimonial-text">
                      &ldquo;{testimonial.text}&rdquo;
                    </Card.Text>
                    <Card.Title className="testimonial-name">
                      {testimonial.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section py-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="newsletter-title">Đăng Ký Nhận Tin Tức</h2>
              <p className="newsletter-subtitle">
                Nhận thông tin về các loài hoa lan mới và ưu đãi đặc biệt
              </p>
              <Form
                onSubmit={handleNewsletterSubmit}
                className="newsletter-form"
              >
                <Row className="g-2 justify-content-center">
                  <Col md={6}>
                    <Form.Control
                      type="email"
                      placeholder="Nhập email của bạn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      size="lg"
                    />
                  </Col>
                  <Col md={3}>
                    <Button
                      type="submit"
                      variant="light"
                      size="lg"
                      className="w-100 fw-bold text-primary"
                    >
                      Đăng Ký
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
