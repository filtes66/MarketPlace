import { createSlice } from "@reduxjs/toolkit";
import initialState, { sliceName } from "./constants";

export const cardSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addToCard: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCard: (state, action) => {
      state.items.filter((item) => item.id != action.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCard, removeFromCard } = cardSlice.actions;

export default cardSlice.reducer;
