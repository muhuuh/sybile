import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../Supabase/supabase";

//update supabase
export const updateAnalysisRequest = createAsyncThunk(
  "user/updateAnalysisRequest",
  async (userDetails, { dispatch }) => {
    const { data, error } = await supabase
      .from("analysis_lookup_requests")
      .update({
        analysis_done: userDetails.analysisDone,
        payment_done: userDetails.paymentMade,
      })
      .match({ request_id: userDetails.assignedId });

    if (error) throw error;

    // If there's no error, update the local Redux state
    dispatch(paymentLookupSlice.updatePaymentData(userDetails));

    return data;
  }
);

//realtime lookup update
export const updateFromRealTime = createAsyncThunk(
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
      analysis_type: "lookup",
    };

    const { data, error } = await supabase
      .from("payment_infos")
      .insert(dataToInsert);

    if (error) throw error;
    console.log("Payment info updated in Supabase:", data);
    return data;
  }
);

export const updateInviteCode = createAsyncThunk(
  "payment/updateInviteCode",
  async (inviteDetails, { dispatch }) => {
    const { redeemed, user_address, code } = inviteDetails;

    const { data, error } = await supabase
      .from("invite_codes")
      .update({
        redeemed: redeemed,
        user_address: user_address,
      })
      .match({ code: code });

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
    analysisDone: false,
  },
  paymentDetails: {
    request_id: 0,
    addressPayer: "",
    minValue: 0,
    valuePaid: 0,
    tx_id: "",
    analysis_type: "lookup",
  },
  invite: { code: "", user: "", redeemed: false },
  paymentSent: false,
};

const paymentLookupSlice = createSlice({
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
    updatePaymentInviteDone(state, action) {
      state.user.paymentMade = action.payload;
    },
    updateInvite(state, action) {
      state.invite = action.payload;
    },
    updateConfidence(state, action) {
      state.confidenceInterval = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAnalysisRequest.fulfilled, (state, action) => {
        // Assuming action.payload contains the new user state
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateFromRealTime.fulfilled, (state, action) => {
        // Handle the real-time data update here
        state.user.paymentMade = action.payload.paymentMade;
        state.user.analysisDone = action.payload.analysisDone;
        state.user.request_id = action.payload.request_id;
      });
  },
});

export const paymentLookupActions = paymentLookupSlice.actions;
export default paymentLookupSlice;
