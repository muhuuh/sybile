import { createSlice } from "@reduxjs/toolkit";

const defaultState = {};

const visualsSlice = createSlice({
  name: "thirdParty",
  initialState: defaultState,
  rawVisualData: {},
  reducers: {
    updateinventoryProducts(state, action) {
      state.inventoryNoDuplicates = action.payload;
    },
  },
});

export const visualsActions = visualsSlice.actions;
export default visualsSlice;
