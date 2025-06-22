import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import ListOfOrchids from "./components/ListOfOrchids";
import EditOrchid from "./components/EditOrchid";
import HomeScreen from "./components/HomeScreen";
import NavBar from "./components/NavBar";
import ListOfEmployees from "./components/ListOfEmployees";
import DetailOrchid from "./components/DetailOrchid";
import Login from "./components/Login";
import OrchidManagement from "./components/admin/OrchidManagement";
import Register from "./components/Register";
import AdminDashboard from "./components/admin/AdminDashboard";
import CategoryManagement from "./components/admin/CategoryManagement";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AccountManagement from "./components/admin/AccountManagement";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Routes */}
        <Route path="/" element={<ListOfOrchids />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/orchids" element={<ListOfEmployees />} />
        <Route path="/detail/:id" element={<DetailOrchid />} />
        <Route path="/edit/:id" element={<EditOrchid />} />

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
      </Routes>
    </>
  );
}

export default App;
