import { useQuery } from "react-query";
import { useAppDispatch } from "../Stores/store";
import { Product_type } from "../Stores/Api/Types/type";
import { fetchType } from "../Stores/Api/typeAPi";
import {
  fetchProductTypeFailure,
  fetchProductTypeStart,
  fetchProductTypeSuccess,
} from "../Stores/Reducer/Type/typeSlice";

const useTypeApi = () => {
  const dispatch = useAppDispatch();

  return useQuery<Product_type[], Error>("product_type", fetchType, {
    onSuccess: (data) => {
      dispatch(fetchProductTypeStart());
      dispatch(fetchProductTypeSuccess(data));
    },
    onError: (error) => {
      dispatch(fetchProductTypeFailure(error.message));
    },
  });
};

export default useTypeApi;
