import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthUser } from "@/services/authService";

function ProtectedRoute({ children }) {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const validateAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          if (isMounted) setIsAllowed(false);
          return;
        }

        const response = await checkAuthUser();
        const isValid = response?.status === 200 && response?.data?.code === 1;

        if (isMounted) {
          setIsAllowed(isValid);
        }
      } catch (error) {
        localStorage.removeItem("token");

        if (isMounted) {
          setIsAllowed(false);
        }
      }
    };

    validateAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isAllowed === null) {
    return <div>Checking authentication...</div>;
  }

  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;