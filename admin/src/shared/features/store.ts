import { configureStore } from "@reduxjs/toolkit";
import authReducer from "shared/features/auth/authSlice";
import homeReducer from "shared/features/home/homeSlice";
import notifyReducer from "shared/features/notify/notifySlice";
import packagesReducer from "shared/features/packages/packagesSlice";
import productsReducer from "shared/features/products/productsSlice";
import usersReducer from "shared/features/users/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notify: notifyReducer,
    home: homeReducer,
    users: usersReducer,
    products: productsReducer,
    packages: packagesReducer,
  },
});

export default store;
