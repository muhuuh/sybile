import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  user: {
    assignedId: 0,
    paymentMade: false,
    analysisDone: true,
  },
};

const paymentSlice = createSlice({
  name: "thirdParty",
  initialState: defaultState,
  paymentData: {
    id: 0,
    paymentDone: false,
    analysisDone: false,
  },
  reducers: {
    updatePaymentData(state, action) {
      state.user = action.payload;
    },
  },
});

export const paymentActions = paymentSlice.actions;
export default paymentSlice;
