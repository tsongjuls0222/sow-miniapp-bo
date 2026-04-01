import api from "@/services/axios";

export function getAllProducts(params) {
  return api.get("/product/list", { params });
}

export function deleteProduct(id) {
  return api.delete(`/product/${id}`);
}

export function updateProduct(id, payload) {
  return api.patch(`/product/${id}`, payload);
}