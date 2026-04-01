import api from "@/services/axios";

export function loginUser(payload) {
  return api.post("/auth/login", payload);
}

export function refreshUserToken() {
  return api.post("/auth/refresh");
}

export function logoutUser() {
  return api.post("/auth/logout");
}

export function getProfile() {
  return api.get("/auth/profile");
}

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