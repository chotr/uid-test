import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAppDispatch } from "../Stores/store";
import { Product } from "../Stores/Api/Types/type";
import { createProduct, fetchProducts } from "../Stores/Api/productApi";
import {
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
} from "../Stores/Reducer/Products/productSlice";

export const useProductApi = () => {
  const dispatch = useAppDispatch();

  return useQuery<Product[], Error>("products", fetchProducts, {
    onSuccess: (data) => {
      dispatch(fetchProductsStart());
      dispatch(fetchProductsSuccess(data));
    },
    onError: (error) => {
      dispatch(fetchProductsFailure(error.message)); 
    },
  });
};

export const useCreateProductApi = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: (product: Product) => {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const result = await createProduct(product);
          resolve(result);
        }, 0);
      });
    },
    onMutate: () => {
      dispatch(fetchProductsStart());
    },
    onSuccess: (newProduct) => {
      queryClient.setQueryData<Product[]>("products", (oldProducts) => [
        ...(oldProducts || []),
        newProduct,
      ]);
      dispatch(fetchProductsSuccess([newProduct]));
    },
    onError: (error) => {
      dispatch(fetchProductsFailure(error.message));
    },
    onSettled: () => {
      queryClient.invalidateQueries("products");
    },
  });
};
