import { createSlice } from "@reduxjs/toolkit";
import initialState from "./constants";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], numberItems: 0, totalPrice: '' },
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
      state.totalPrice = state.items.reduce((accumulator, item) => accumulator + item.prix, 0);
      state.numberItems++;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce((accumulator, item) => accumulator + item.prix, 0);
      state.numberItems--;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, calculTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;
