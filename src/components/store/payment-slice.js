import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../Supabase/supabase";

//update supabase
export const updateAnalysisRequest = createAsyncThunk(
  "user/updateAnalysisRequest",
  async (userDetails, { dispatch }) => {
    const { data, error } = await supabase
      .from("analysis_requests")
      .update({
        analysis_done: userDetails.analysisDone,
        payment_done: userDetails.paymentMade, // Make sure these fields exist in your table
      })
      .match({ request_id: userDetails.assignedId });

    if (error) throw error;

    // If there's no error, update the local Redux state
    dispatch(paymentActions.updatePaymentData(userDetails));

    return data;
  }
);

//update redux store
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
  reducers: {
    updatePaymentData(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAnalysisRequest.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const paymentActions = paymentSlice.actions;
export default paymentSlice;
