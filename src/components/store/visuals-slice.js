import { createSlice } from "@reduxjs/toolkit";

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
