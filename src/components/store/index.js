import { configureStore } from "@reduxjs/toolkit";
import visualsSlice from "./visuals-slice";

const store = configureStore({
  reducer: {
    visuals: visualsSlice.reducer,
  },
});

export default store;
