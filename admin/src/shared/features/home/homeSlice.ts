import { createSlice } from "@reduxjs/toolkit";

export type Count = {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
};

export type Home = {
  users: Count;
  products: Count;
  packages: Count;
  graph: {
    users: number[];
    products: number[];
    packages: number[];
  };
};

const initialState: Home = {
  users: { today: 0, thisWeek: 0, thisMonth: 0, total: 0 },
  products: { today: 0, thisWeek: 0, thisMonth: 0, total: 0 },
  packages: { today: 0, thisWeek: 0, thisMonth: 0, total: 0 },
  graph: {
    users: [0, 0, 0, 0, 0],
    products: [0, 0, 0, 0, 0],
    packages: [0, 0, 0, 0, 0],
  },
};

const homeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    update: (state, { payload }) => {
      state.users = payload.users;
      state.products = payload.products;
      state.packages = payload.users;
      state.graph = payload.graph;
    },
  },
});

export const { update } = homeSlice.actions;

export default homeSlice.reducer;
