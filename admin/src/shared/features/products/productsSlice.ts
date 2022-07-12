import { createSlice } from "@reduxjs/toolkit";
import { User } from "../users/usersSlice";

export type Product = {
  id: string;
  name: string;
  userId: User;
  categoryId: {
    id: string;
    name: string;
  };
  isVerified: boolean;
  isAvailable: boolean;
  condition: string;
  price: number;
  images: [string];
};

const initialState = {
  count: 0,
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    initProducts: (state, { payload }) => {
      state.count = payload.count;
      state.products = payload.data;
    },
  },
});

export const { initProducts } = productsSlice.actions;

export default productsSlice.reducer;
