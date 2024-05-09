import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchPhotosFromAPI from "../../../api/api.js";
import { returnPhotosArrays } from "./returnPhotosArrays.js";

export default {
  fetchPhotos: createAsyncThunk("photos/fetchPhotos", async (windowSize) => {
    try {
      const response = await fetchPhotosFromAPI();
      const responseCopy = JSON.parse(JSON.stringify(response));
      return returnPhotosArrays(responseCopy, windowSize);
    } catch (err) {
      throw new Error(err);
    }
  }),
};
