const API_URL = "http://localhost:4000/api/products";

export const getProducts = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Products API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to load products");
    }

    return data.products || [];
  } catch (error) {
    console.error("getProducts Error:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Product API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to load product");
    }

    return data.product;
  } catch (error) {
    console.error("getProductById Error:", error);
    throw error;
  }
};

