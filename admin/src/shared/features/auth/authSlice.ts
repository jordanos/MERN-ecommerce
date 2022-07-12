import { createSlice } from "@reduxjs/toolkit";

export type Admin = {
  email: String;
  read: Boolean;
  write: Boolean;
  addAdmin: Boolean;
  removeAdmin: Boolean;
  super: Boolean;
};

export type Auth = {
  isLogged: Boolean;
  token: String | null;
  admin: Admin | null;
};

const initialState: Auth = {
  isLogged: false,
  token: null,
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isLogged = true;
      state.token = payload.token;
      state.admin = payload.admin;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
