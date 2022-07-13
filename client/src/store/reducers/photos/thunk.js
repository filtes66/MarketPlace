import { createAsyncThunk } from "@reduxjs/toolkit";
import getPhotos from "../../../services/getPhotos";

const returnPhotosArrays = (items) => {
  const districtsArrays = [];
  const arrayQuart = [];
  const arrayAdmin = [];
  let cond = true;
  for (let i = 1; i <= 20; i++) {
    let districtArray = [];
    items.map((item) => {
      if (item.arrond === i) {
        districtArray.push(item);
      }
      if (item.type === 1 && cond) {
        arrayAdmin.push(item);
      }
      if (item.type === 2 && cond) {
        arrayQuart.push(item);
      }
    });
    cond = false;
    !!districtArray.length && districtsArrays.push(districtArray);
  }
  const photosObject = {
    districtArray: districtsArrays,
    arrayAdmin: arrayAdmin,
    arrayQuart: arrayQuart,
  };
  return photosObject;
};

export default {
  fetchPhotos: createAsyncThunk("photos/fetchPhotos", async () => {
    try {
      const response = await getPhotos("http://localhost:5000/photos");
      return returnPhotosArrays(response);
    } catch (err) {
      throw new Error(err);
    }
  }),
};
