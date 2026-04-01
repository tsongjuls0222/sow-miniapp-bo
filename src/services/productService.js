import api from "@/services/axios";

export function getAllProducts(params) {
  return api.get("/product/list", { params });
}

export function getProduct(id) {
  return api.get(`/product/${id}`);
}


export function deleteProduct(id) {
  return api.delete(`/product/${id}`);
}

export function updateProduct(id, payload) {
  return api.patch(`/product/${id}`, payload);
}

export function addProduct(payload) {
  return api.post("/product/add", payload);
}