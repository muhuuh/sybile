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
    return data.data_network;
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
    return data.data_sybile_addresses;
  }
);

const defaultState = {
  networkAnalysis: {
    nodes: [],
    links: [],
  },
  dataAnalysis: {
    totalUsers: 0,
    totalSybilAddresses: 0,
    sybilAddressPercentage: 0,
    sybiledTokenPercentage: 0,
    addressesAccountingForTopSybil: 0,
    topSybileClusters: {
      totalAddresses: 0,
      claimedPercentage: 0,
    },
  },

  sybileAddresseAnalysis: {},
  requestValid: true,
};

const lookupAnalysisSlice = createSlice({
  name: "thirdParty",
  initialState: defaultState,

  reducers: {
    updateNetworkAnalysis(state, action) {
      state.networkAnalysis = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNetworkAnalysis.fulfilled, (state, action) => {
        state.networkAnalysis = action.payload;
        state.requestValid = true; // Set requestValid to true on successful fetch
      })
      .addCase(fetchDataAnalysis.fulfilled, (state, action) => {
        state.dataAnalysis = action.payload;
        state.requestValid = true; // Set requestValid to true on successful fetch
      })
      .addCase(fetchAddressAnalysis.fulfilled, (state, action) => {
        state.sybileAddresseAnalysis = action.payload;
        state.requestValid = true; // Set requestValid to true on successful fetch
      })
      .addCase(fetchNetworkAnalysis.rejected, (state, action) => {
        state.requestValid = false; // Set requestValid to false on rejection
      })
      .addCase(fetchDataAnalysis.rejected, (state, action) => {
        state.requestValid = false; // Set requestValid to false on rejection
      })
      .addCase(fetchAddressAnalysis.rejected, (state, action) => {
        state.requestValid = false; // Set requestValid to false on rejection
      });
  },
});

export const lookupAnalysisAction = lookupAnalysisSlice.actions;
export default lookupAnalysisSlice;
