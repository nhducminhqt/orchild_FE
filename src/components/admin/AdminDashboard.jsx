// ...existing code...
import AdminSidebar from "./AdminSidebar";

function AdminDashboard() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#fff" }}>
      <AdminSidebar active="dashboard" />
      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Admin Dashboard</h2>
        <div className="text-muted">
          Welcome to the admin dashboard. Use the sidebar to manage categories,
          orchids, and user accounts.
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
