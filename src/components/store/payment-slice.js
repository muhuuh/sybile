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
        payment_done: userDetails.paymentMade,
      })
      .match({ request_id: userDetails.assignedId });

    if (error) throw error;

    // If there's no error, update the local Redux state
    dispatch(paymentActions.updatePaymentData(userDetails));

    return data;
  }
);

//realtime lookup update
export const updateFromRealTimePredictive = createAsyncThunk(
  "user/updateFromRealTime",
  async (updateDetails) => {
    console.log("updateDetails:", updateDetails);
    return updateDetails; // Directly return details to be handled by extraReducers
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
      analysis_type: "predictive",
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
    paymentMade: false,
    analysisDone: true, //TODO change to false. true is only for testing purpose until script connected
  },
  paymentDetails: {
    request_id: 0,
    addressPayer: "",
    minValue: 0,
    valuePaid: 0,
    tx_id: "",
    analysis_type: "predictive",
  },
  paymentSent: false,
  confidenceInterval: 0.95,
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
    updatePaymentSent(state, action) {
      state.paymentSent = action.payload;
    },
    updateConfidence(state, action) {
      state.confidenceInterval = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAnalysisRequest.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateFromRealTimePredictive.fulfilled, (state, action) => {
        // Handle the real-time data update here
        state.user.paymentMade = action.payload.paymentMade;
        state.user.analysisDone = action.payload.analysisDone;
        state.user.request_id = action.payload.request_id;
      });
  },
});

export const paymentActions = paymentSlice.actions;
export default paymentSlice;
