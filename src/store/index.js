import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/slice";
import photosReducer from "./reducers/photos/slice";
import cartReducer from "./reducers/cart/slice";
import paymentReducer from "./reducers/payment/slice";

const reducer = {
  auth: authReducer,
  cart: cartReducer,
  photos: photosReducer,
  payment: paymentReducer,
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});