import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedAdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  console.log("Auth Check:", { isLoggedIn, userRole }); // Add logging to debug

  if (!isLoggedIn) {
    console.log("Not logged in, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "ROLE_ADMIN") {
    console.log("Not admin, redirecting to home");
    return <Navigate to="/home" replace />;
  }

  return children;
}

ProtectedAdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedAdminRoute;
