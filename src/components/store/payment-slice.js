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

export const updatePaymentInfo = createAsyncThunk(
  "payment/updatePaymentInfo",
  async (paymentDetails, { dispatch }) => {
    const { request_id, addressPayer, minValue } = paymentDetails;
    const dataToInsert = {
      request_id,
      address_payer: addressPayer,
      min_value: minValue,
    };

    const { data, error } = await supabase
      .from("payment_infos")
      .insert(dataToInsert);

    if (error) throw error;
    console.log("Payment info updated in Supabase:", data);
    return data;
  }
);

//update redux store
const defaultState = {
  user: {
    request_id: 0,
    paymentMade: true,
    analysisDone: true,
  },
  paymentDetails: {
    request_id: 0,
    addressPayer: "",
    minValue: 0,
    valuePaid: 0,
    tx_id: "",
  },
};

const paymentSlice = createSlice({
  name: "thirdParty",
  initialState: defaultState,
  reducers: {
    updatePaymentData(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    updatePaymentDetails(state, action) {
      state.paymentDetails = { ...state.paymentDetails, ...action.payload };
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
