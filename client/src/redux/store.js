import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/ProductSlice"
import cartReducer from "./features/CartSlice"
import userReducer from "./features/UserSlice"
import { injectStore } from "../service/AxiosInstance";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer
  }
});

injectStore(store)