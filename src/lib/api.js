import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

export async function searchProducts(query, type = "text") {
  const { data } = await api.post("/search", { query, type });
  return data;
}

export async function getProducts(params = {}) {
  const { data } = await api.get("/products", { params });
  return data;
}

export async function getProduct(id) {
  const { data } = await api.get(`/product/${id}`);
  return data;
}

export async function chatWithProduct(productId, message, history = []) {
  const { data } = await api.post(`/product/${productId}/chat`, { message, history });
  return data;
}

export async function getCategories() {
  const { data } = await api.get("/categories");
  return data;
}

export default api;
