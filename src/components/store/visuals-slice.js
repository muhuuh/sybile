import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  rawVisualData: {},
  mainDataPoints: { sybileAddrNbr: 0, sybileClusterNbr: 0, biggestCluster: 0 },
};

const visualsSlice = createSlice({
  name: "thirdParty",
  initialState: defaultState,

  reducers: {
    updateinventoryProducts(state, action) {
      state.inventoryNoDuplicates = action.payload;
    },
  },
});

export const visualsActions = visualsSlice.actions;
export default visualsSlice;
