import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product_type, ProductTypeState } from "../../Api/Types/type";

const initialState: ProductTypeState = {
  product_type: [],
  loading: false,
  error: null,
};

const productTypeSlice = createSlice({
  name: "product_type",
  initialState,
  reducers: {
    fetchProductTypeStart(state: any) {
      state.loading = true;
      state.error = null;
    },
    fetchProductTypeSuccess(state: any, action: PayloadAction<Product_type[]>) {
      state.product_type = action.payload;
    },
    fetchProductTypeFailure(state: any, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchProductTypeStart,
  fetchProductTypeSuccess,
  fetchProductTypeFailure,
} = productTypeSlice.actions;
export default productTypeSlice.reducer;
