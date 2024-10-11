import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../Api/Types/type";

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
