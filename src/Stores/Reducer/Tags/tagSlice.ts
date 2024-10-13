import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag, TagsState } from "../../Api/Types/type";

const initialState: TagsState = {
  tags: [],
  loading: false,
  error: null,
};

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    fetchTagStart(state: any) {
      state.loading = true;
      state.error = null;
    },
    fetchTagSuccess(state, action: PayloadAction<Tag[]>) {
      state.tags = action.payload;
    },
    fetchTagFailire(state: any, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchTagStart, fetchTagSuccess, fetchTagFailire } = tagSlice.actions;
export default tagSlice.reducer;
