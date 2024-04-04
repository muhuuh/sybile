import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../Supabase/supabase";

// Async thunk to fetch analysis data
export const fetchNetworkAnalysis = createAsyncThunk(
  "thirdParty/fetchNetworkAnalysis",
  async (requestId) => {
    const { data, error } = await supabase
      .from("analysis_results")
      .select("data_network")
      .match({ request_id: requestId })
      .single();

    if (error) throw new Error(error.message);
    return data.data_analysis;
  }
);

export const fetchDataAnalysis = createAsyncThunk(
  "thirdParty/fetchDataAnalysis",
  async (requestId) => {
    const { data, error } = await supabase
      .from("analysis_results")
      .select("data_analysis")
      .match({ request_id: requestId })
      .single();

    if (error) throw new Error(error.message);
    return data.data_analysis;
  }
);

export const fetchAddressAnalysis = createAsyncThunk(
  "thirdParty/fetchAddressAnalysis",
  async (requestId) => {
    const { data, error } = await supabase
      .from("analysis_results")
      .select("data_sybile_addresses")
      .match({ request_id: requestId })
      .single();

    if (error) throw new Error(error.message);
    return data.data_analysis;
  }
);

const defaultState = {
  networkAnalysis: {},
  dataAnalysis: {},
  sybileAddresseAnalysis: {},
};

const visualsSlice = createSlice({
  name: "thirdParty",
  initialState: defaultState,

  reducers: {
    updateNetworkAnalysis(state, action) {
      state.networkAnalysis = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataAnalysis.fulfilled, (state, action) => {
      state.dataAnalysis = action.payload;
    });
  },
});

export const visualsActions = visualsSlice.actions;
export default visualsSlice;
