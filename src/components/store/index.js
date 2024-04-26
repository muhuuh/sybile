import { configureStore } from "@reduxjs/toolkit";
import visualsSlice from "./visuals-slice";
import paymentSlice from "./payment-slice";
import paymentLookupSlice from "./payment-lookup-slice";
import lookupAnalysisSlice from "./analysis-lookup-slice";

const store = configureStore({
  reducer: {
    visuals: visualsSlice.reducer,
    paymnent: paymentSlice.reducer,
    paymnentLookup: paymentLookupSlice.reducer,
    analysisLookup: lookupAnalysisSlice.reducer,
  },
});

export default store;
