import api from "@/services/axios";

export function getAllProducts(params) {
  return api.get("/product/list", { params });
}