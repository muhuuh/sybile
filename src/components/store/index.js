import { configureStore } from "@reduxjs/toolkit";
import visualsSlice from "./visuals-slice";
import paymentSlice from "./payment-slice";

const store = configureStore({
  reducer: {
    visuals: visualsSlice.reducer,
    paymnent: paymentSlice.reducer,
  },
});

export default store;
