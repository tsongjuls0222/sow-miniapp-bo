import api from "@/services/axios";

let isLoggingOut = false;

export function interceptorService({ getAccessToken, setAccessToken, logout }) {
  api.interceptors.request.use(
    (config) => {
      const token = getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error?.response?.status;

      if (status === 401 && !isLoggingOut) {
        isLoggingOut = true;

        try {
          setAccessToken(null);
          await logout();
        } finally {
          isLoggingOut = false;
        }
      }

      return Promise.reject(error);
    }
  );
}