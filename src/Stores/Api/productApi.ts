import api from "../../mockApi";
import { Product } from "./Types/type";

const API_URL = "/products";

// get all products
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get(API_URL);
  return response.data;
};

// create product
export const createProduct = async (product: Product): Promise<Product> => {
  const response = await api.post(API_URL, product);
  return response.data;
};

// update product
export const updateProduct = async (id: string, product: Product): Promise<Product> => {
    const response = await api.put(API_URL + `/${id}`, product);
    return response.data;
}
