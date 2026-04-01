import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { refreshUserToken, logoutUser, getProfile } from "@/services/authService";
import { interceptorService } from "@/services/interceptorService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const interceptorInitialized = useRef(false);
  const accessTokenRef = useRef(null);

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAccessToken(null);
      setUser(null);
      window.location.href = "/login";
    }
  };

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data.data.user);
    } catch (error) {
      console.error("Load profile failed:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    if (interceptorInitialized.current) return;

    interceptorService({
      getAccessToken: () => accessTokenRef.current,
      setAccessToken,
      logout
    });

    interceptorInitialized.current = true;
  }, []);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const refreshResponse = await refreshUserToken();
        const newAccessToken = refreshResponse.data.data.accessToken;

        setAccessToken(newAccessToken);
      } catch (error) {
        setAccessToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    loadProfile();
  }, [accessToken]);

  const value = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      user,
      setUser,
      authLoading,
      logout
    }),
    [accessToken, user, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}