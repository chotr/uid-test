import api from "../../mockApi";
import { Tag } from "./Types/type";

const API_URL = "/tags";

// get all tags
export const fetchTags = async (): Promise<Tag[]> => {
  const res = await api.get(API_URL);
  return res.data;
};
