import { createSlice } from "@reduxjs/toolkit";
import initialState, { sliceName } from "./constants";
import thunk from "./thunk";

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunk.fetchPhotos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(thunk.fetchPhotos.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(thunk.fetchPhotos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { } = photosSlice.actions;

export default photosSlice.reducer;
