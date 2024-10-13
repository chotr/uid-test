import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsState } from "../../Api/Types/type";

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart(state: any) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    fetchProductsFailure(state: any, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // creat product
    createProduct(state: any) {
      state.loading = true;
      state.error = null;
    },
    createProductSuccess(state: any, action: PayloadAction<Product>) {
      state.products.push(action.payload);
      state.loading = false;
    },
    createProductFailure(state: any, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productSlice.actions;
export default productSlice.reducer;
