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
  networkAnalysis: {},
  dataAnalysis: {
    executiveSummary: {
      totalSybilAddresses: 0,
      totalParticipants: 0,
      sybilPercentage: 0,
      sybilTokenPercentage: 0,
      financialLoss: 0,
      topSybilAddresses: 0,
      topSybilPercentage: 0,
      mostActiveClusters: {
        totalClusters: 0,
        totalAddresses: 0,
        claimedTokens: 0,
        claimedPercentage: 0,
      },
    },
    initialFindings: {
      totalAddresses: 0,
      totalClaimedENA: 0,
      sybilClaimedENA: 0,
      potentialSavingsENA: 0,
      largestCluster: {
        addressCount: 0,
        claimedENA: 0,
      },
    },
    detailedAnalysis: {
      sybilAttackDistribution: {
        averageClaimedENA: 0,
        standardDeviation: 0,
        medianClaimedENA: 0,
      },
      sybileAmount: {
        perAddressAverage: 0,
        perAddressMedian: 0,
        perClusterAverage: 0,
        perClusterMedian: 0,
      },
      topClaimers: {
        topAddressClaimedENA: 0,
        topClusters: [
          {
            clusterId: 0,
            claimedENA: 0,
            percentageOfTotalClaimed: 0,
          },
        ],
      },
      clusterInsights: {
        averageClusterSize: 0,
      },
    },
  },
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
    builder.addCase(fetchNetworkAnalysis.fulfilled, (state, action) => {
      state.networkAnalysis = action.payload;
    });
    builder.addCase(fetchDataAnalysis.fulfilled, (state, action) => {
      state.dataAnalysis = action.payload;
    });
    builder.addCase(fetchAddressAnalysis.fulfilled, (state, action) => {
      state.sybileAddresseAnalysis = action.payload;
    });
  },
});

export const visualsActions = visualsSlice.actions;
export default visualsSlice;
