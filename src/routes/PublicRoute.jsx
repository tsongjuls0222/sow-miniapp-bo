import { Navigate } from "react-router-dom";
import { useAuth } from "@/global/AuthContext";

function PublicRoute({ children }) {
  const { accessToken, authLoading } = useAuth();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (accessToken) {
    return <Navigate to="/pricelist" replace />;
  }

  return children;
}

export default PublicRoute;