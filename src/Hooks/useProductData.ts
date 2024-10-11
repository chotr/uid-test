import { useQuery } from "react-query";
import { useAppDispatch } from "../Stores/store";
import { Product } from "../Stores/Api/Types/type";
import { fetchProducts } from "../Stores/Api/productApi";
import { setProducts } from "../Stores/Reducer/Products/productSlice";

export const useProductData = () => {
  const dispatch = useAppDispatch();

  return useQuery<Product[], Error>("products", fetchProducts, {
    onSuccess: (data) => {
      dispatch(setProducts(data));
    },
  });
};
