import OrderManagement from "./components/admin/OrderManagement";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import DetailOrchid from "./components/OrchidDetail";
import MyOrders from "./components/MyOrders";
import Login from "./components/Login";
import OrchidManagement from "./components/admin/OrchidManagement";
import Register from "./components/Register";
import AdminDashboard from "./components/admin/AdminDashboard";
import CategoryManagement from "./components/admin/CategoryManagement";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AccountManagement from "./components/admin/AccountManagement";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<HomePage />} />

        {/* Protected User Routes */}
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/detail/:id" element={<DetailOrchid />} />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedAdminRoute>
              <CategoryManagement />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/orchids"
          element={
            <ProtectedAdminRoute>
              <OrchidManagement />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/accounts"
          element={
            <ProtectedAdminRoute>
              <AccountManagement />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute>
              <OrderManagement />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      <div className="footer-spacer" />
      <Footer />
    </>
  );
}

export default App;
