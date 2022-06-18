import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { compose, applyMiddleware } from "redux";
import { photosSlice } from "./reducers/photos/slice";
import { cardSlice } from "./reducers/card/slice";

const reducers = combineReducers({
  // user,
  card: cardSlice.reducer,
  // [photos.name]: photos,
  photos: photosSlice.reducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore({
  reducer: reducers,
  devTools: composeEnhancer,
});
