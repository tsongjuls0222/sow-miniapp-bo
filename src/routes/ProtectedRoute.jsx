import { Navigate } from "react-router-dom";
import { useAuth } from "@/global/AuthContext";

function ProtectedRoute({ children }) {
  const { accessToken, authLoading } = useAuth();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;