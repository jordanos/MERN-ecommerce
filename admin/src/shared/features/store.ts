import { configureStore } from "@reduxjs/toolkit";
import authReducer from "shared/features/auth/authSlice";
import homeReducer from "shared/features/home/homeSlice";
import notifyReducer from "shared/features/notify/notifySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notify: notifyReducer,
    home: homeReducer,
  },
});

export default store;
