// ...existing code...

import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import axiosInstance from "../../axiosInstance";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [orchids, setOrchids] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError("");
      try {
        const [ordersRes, orchidsRes, categoriesRes, accountsRes] = await Promise.all([
          axiosInstance.get("/orders"),
          axiosInstance.get("/orchids"),
          axiosInstance.get("/categories"),
          axiosInstance.get("/accounts"),
        ]);
        setOrders(ordersRes.data);
        setOrchids(orchidsRes.data);
        setCategories(categoriesRes.data);
        setAccounts(accountsRes.data);
      } catch {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  // Statistics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const orderStatusCounts = orders.reduce((acc, o) => {
    acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1;
    return acc;
  }, {});

  // Chart data
  const orderStatusData = {
    labels: Object.keys(orderStatusCounts),
    datasets: [
      {
        label: "Orders",
        data: Object.values(orderStatusCounts),
        backgroundColor: [
          "#b983ff",
          "#f3e8ff",
          "#ffb6b9",
          "#a0e7e5",
          "#f6d6ad",
        ],
      },
    ],
  };

  const revenueByMonth = {};
  orders.forEach((o) => {
    if (!o.orderDate) return;
    const d = new Date(o.orderDate);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    revenueByMonth[key] = (revenueByMonth[key] || 0) + (o.totalAmount || 0);
  });
  const revenueBarData = {
    labels: Object.keys(revenueByMonth),
    datasets: [
      {
        label: "Revenue",
        data: Object.values(revenueByMonth),
        backgroundColor: "#b983ff",
      },
    ],
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#fff" }}>
      <AdminSidebar active="dashboard" />
      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Admin Dashboard</h2>
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <Row className="mb-4 g-4">
              <Col md={3} sm={6} xs={12}>
                <Card className="shadow-sm border-0 text-center" style={{ background: "#f3e8ff" }}>
                  <Card.Body>
                    <h5 className="mb-2">Total Orchids</h5>
                    <h2 style={{ color: "#b983ff" }}>{orchids.length}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} sm={6} xs={12}>
                <Card className="shadow-sm border-0 text-center" style={{ background: "#f6d6ad" }}>
                  <Card.Body>
                    <h5 className="mb-2">Total Categories</h5>
                    <h2 style={{ color: "#e29578" }}>{categories.length}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} sm={6} xs={12}>
                <Card className="shadow-sm border-0 text-center" style={{ background: "#a0e7e5" }}>
                  <Card.Body>
                    <h5 className="mb-2">Total Users</h5>
                    <h2 style={{ color: "#38b6ff" }}>{accounts.length}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} sm={6} xs={12}>
                <Card className="shadow-sm border-0 text-center" style={{ background: "#ffb6b9" }}>
                  <Card.Body>
                    <h5 className="mb-2">Total Orders</h5>
                    <h2 style={{ color: "#ff6f91" }}>{orders.length}</h2>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mb-4 g-4">
              <Col md={6} xs={12}>
                <Card className="shadow-sm border-0 p-3">
                  <h5 className="mb-3">Order Status Breakdown</h5>
                  <Pie data={orderStatusData} />
                </Card>
              </Col>
              <Col md={6} xs={12}>
                <Card className="shadow-sm border-0 p-3">
                  <h5 className="mb-3">Revenue by Month</h5>
                  <Bar data={revenueBarData} />
                </Card>
              </Col>
            </Row>
            <Row className="mb-4 g-4">
              <Col md={6} xs={12}>
                <Card className="shadow-sm border-0 text-center" style={{ background: "#e0c3fc" }}>
                  <Card.Body>
                    <h5 className="mb-2">Total Revenue</h5>
                    <h2 style={{ color: "#7f53ac" }}>${totalRevenue.toLocaleString()}</h2>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
