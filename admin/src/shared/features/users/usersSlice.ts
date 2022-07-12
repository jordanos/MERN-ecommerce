import { createSlice } from "@reduxjs/toolkit";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  isVerified: boolean;
  status: "active" | "deactive";
  balance: number;
  image: string;
};

const initialState = {
  count: 0,
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    initUsers: (state, { payload }) => {
      state.count = payload.count;
      state.users = payload.data;
    },
  },
});

export const { initUsers } = usersSlice.actions;

export default usersSlice.reducer;
