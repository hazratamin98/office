import { configureStore } from "@reduxjs/toolkit";
import LocationReducer from "./slices/location";

export const store = configureStore({
  reducer: {
    location: LocationReducer,
  },
});
