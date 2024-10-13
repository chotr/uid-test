import { useQuery } from "react-query";
import { useAppDispatch } from "../Stores/store";
import { Tag } from "../Stores/Api/Types/type";
import { fetchTags } from "../Stores/Api/tagApi";
import { fetchTagFailire, fetchTagStart, fetchTagSuccess } from "../Stores/Reducer/Tags/tagSlice";

export const useTagApi = () => {
  const dispatch = useAppDispatch();

  return useQuery<Tag[], Error>("tags", fetchTags, {
    onSuccess: (data) => {
      dispatch(fetchTagStart());
      dispatch(fetchTagSuccess(data));
    },
    onError: (error) => {
        dispatch(fetchTagFailire(error.message));
    }
  });
};
