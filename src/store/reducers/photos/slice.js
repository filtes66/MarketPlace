import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialState, { sliceName } from "./constants";
import fetchPhotosFromAPI from "../../../api/api";
import { returnPhotosArrays } from "./returnPhotosArrays";

export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", async () => {
  try {
    const response = await fetchPhotosFromAPI();
    const responseCopy = JSON.parse(JSON.stringify(response));
    return responseCopy;
  } catch (err) {
    throw new Error(err);
  }
});

export const galleryDisplaySlice = createSlice({
  name: 'gallery',
  initialState: initialState,
  reducers: {
    resizeGallery: (state, action) => {
      state.items = returnPhotosArrays(action.payload.items, action.payload.viewportWidth);
      state.windowSize = action.payload.viewportWidth;
    }
  },
})

export const photosDatabaseSlice = createSlice({
  name: 'photos',
  initialState: {
    isLoading: false,
    items: [],
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPhotos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resizeGallery } = galleryDisplaySlice.actions;

export const galleryDisplayReducer = galleryDisplaySlice.reducer;
export const photosDatabaseReducer = photosDatabaseSlice.reducer;
