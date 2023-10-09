import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Controls = {
  values: {
    showCart: boolean;
    spinner: boolean;
  };
};

const initialState: Controls = {
  values: {
    showCart: false,
    spinner: false,
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
