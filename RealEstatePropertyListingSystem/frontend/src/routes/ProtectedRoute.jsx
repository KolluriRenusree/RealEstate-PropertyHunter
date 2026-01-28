import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const ProtectedRoute = ({ children, role: allowedRole }) => {
  const { isAuthenticated, role } = useAuth();

  // ❌ Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but wrong role
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized
  return children;
};

export default ProtectedRoute;
