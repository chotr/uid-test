import api from "../../mockApi";
import { Product_type } from "./Types/type";

const API_URL = "/product_type";

export const fetchType = async (): Promise<Product_type[]> => {
  const res = await api.get(API_URL);

  return res.data;
};
