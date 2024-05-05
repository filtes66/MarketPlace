import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialState, { sliceName } from "./constants";
import getPhotos from "../../../api/api";
import { returnPhotosArrays } from "./returnPhotosArrays";

export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", async () => {
  try {
    const response = await getPhotos();
    const responseCopy = JSON.parse(JSON.stringify(response));
    console.log('responseCopy', responseCopy);
    return responseCopy;
  } catch (err) {
    throw new Error(err);
  }
});

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState: initialState,
  reducers: {
    resizeGallery: (state, action) => {
      state.items = returnPhotosArrays(action.payload.items, action.payload.windowSize);
      state.windowSize = action.payload.windowSize;
    }
  },
})

export const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    isLoading: false,
    items2: [],
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.items2 = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPhotos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});


// Action creators are generated for each case reducer function
export const { resizeGallery } = gallerySlice.actions;

export const galleryReducer = gallerySlice.reducer;
export const photoReducer = photosSlice.reducer;
