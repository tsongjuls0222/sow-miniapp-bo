import api from "@/services/axios";

export function GetLanguage(code) {
  return api.get("/language/get", {
    params: { code }
  });
}