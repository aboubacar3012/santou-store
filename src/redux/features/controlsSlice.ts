import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type DisplayMode = "rider" | "client" | "merchant" | "admin";

type Controls = {
  values: {
    showCart: boolean;
    spinner: boolean;
    displayMode: DisplayMode;
    orderChoiceDrawer:boolean;
    takingOrderDrawer:boolean;
    planningOrderDrawer:boolean;
    selectAddressDrawer:boolean;
    newAddressWindow:boolean;

  };
};

const initialState: Controls = {
  values: {
    showCart: false,
    spinner: false,
    displayMode: "client",
    orderChoiceDrawer:false,
    takingOrderDrawer:false,
    planningOrderDrawer:false,
    selectAddressDrawer:false,
    newAddressWindow:false,
  },
};

export const controlsSlice = createSlice({
  name: "controlsSlice",
  initialState,
  reducers: {
    updateControl: (state, action: PayloadAction<object>) => {
      state.values = initialState.values;
      state.values = { ...state.values, ...action.payload };
      return state;
    },
    clearControls: () => {
      return initialState;
    },
  },
});

export const { updateControl, clearControls } = controlsSlice.actions;

export default controlsSlice.reducer;
