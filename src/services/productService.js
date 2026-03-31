import api from "@/services/axios";

export const getAllProducts = async (data) => {
  try {
    const response = await api.get("/product/list", {
      params: {
        article_no: data.article_no || null,
        name: data.name || null
      }
    });
    console.log("Product response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Product error:", error);
    console.log("Backend message:", error.response?.data);
  }
};


