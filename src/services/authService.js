import api from "@/services/axios";

export const loginUser = async (payload) => {
  try {
    const response = await api.post("/auth/login", payload);
    console.log("Login response:", response);
    return response;
  } catch (error) {
    console.log("Login error:", error);
    console.log("Backend message:", error.response?.data);
  }
};

export const checkAuthUser = async () => {
  try {
    const response = await await api.get("/auth/user");
    console.log("Auth check response:", response);
    return response;
  } catch (error) {
    console.log("Auth check error:", error);
    console.log("Backend message:", error.response?.data);
  }
};

export const GetLanguage = async (langCode) => {
  try {
    const response = await api.get("/auth/language", {
      params: {
        code: langCode
      }
    });
    // console.log("Language response:", response);
    return response;
  } catch (error) {
    console.log("Language error:", error);
    console.log("Backend message:", error.response?.data);
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    console.log("Logout response:", response);
    return response;
  } catch (error) {
    console.log("Logout error:", error);
    console.log("Backend message:", error.response?.data);
  }
};



