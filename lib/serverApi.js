import { apiServiceConfig } from "@/app/config/apiService";

/**
 * Fetch products server-side
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Object>} - Products data
 */
export async function fetchProductsSSR(filters = {}) {
  try {
    const params = new URLSearchParams(filters).toString();

    const response = await fetch(
      `${apiServiceConfig.baseURL}/products?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.status) {
      return {
        success: true,
        products: data.data.products || [],
        pagination: data.data.pagination || null,
      };
    }

    return {
      success: false,
      products: [],
      pagination: null,
      message: data.message,
      errors: data.errors || {},
    };
  } catch (error) {
    console.error("Error fetching products SSR:", error);

    return {
      success: false,
      products: [],
      pagination: null,
      message: "Something Went Wrong",
      errors: {},
    };
  }
}


/**
 * Fetch categories server-side
 * @returns {Promise<Array>} - Categories data
 */
export async function fetchCategoriesSSR() {
  try {
    const response = await fetch(
      `${apiServiceConfig.baseURL}/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data.status) {
      return {
        success: true,
        data: data.data || [],
      };
    }

    return {
      success: false,
      data: [],
      message: data.message,
      errors: data.errors || {},
    };
  } catch (error) {
    console.error("Error fetching categories SSR:", error);

    return {
      success: false,
      data: [],
      message: "Something Went Wrong",
      errors: {},
    };
  }
}




