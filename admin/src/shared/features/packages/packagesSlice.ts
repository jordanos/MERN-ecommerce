import { createSlice } from "@reduxjs/toolkit";

export type Package = {
  id: string;
  name: string;
  price: number;
  maxPosts: number;
  expiresAfter: number;
  image: string;
  createdAt: string;
};

const initialState = {
  count: 0,
  packages: [],
};

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    initPackages: (state, { payload }) => {
      state.count = payload.count;
      state.packages = payload.data;
    },
  },
});

export const { initPackages } = packagesSlice.actions;

export default packagesSlice.reducer;
