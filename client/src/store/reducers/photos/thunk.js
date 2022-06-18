import { createAsyncThunk } from "@reduxjs/toolkit";
import getPhotos from "../../../services/getPhotos";

const returnPhotosArrays = (items) => {
  const ArrondissementsArrays = [];
  const arrayQuart = [];
  const arrayAdmin = [];
  let cond = true;
  for (let i = 1; i <= 20; i++) {
    let arrayArrond = [];
    items.map((item) => {
      if (item.arrond === i) {
        arrayArrond.push(item);
      }
      if (item.type === 1 && cond) {
        arrayAdmin.push(item);
      }
      if (item.type === 2 && cond) {
        arrayQuart.push(item);
      }
    });
    cond = false;
    !!arrayArrond.length && ArrondissementsArrays.push(arrayArrond);
  }
  const photosObject = {
    arrayArrond: ArrondissementsArrays,
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
