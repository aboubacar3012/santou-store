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
    showPaymentDrawer:boolean;
    adminLeftSidebar:boolean;
    showDashBoardScreen:boolean;
    showOrdersScreen:boolean;
    showSummariesScreen:boolean;
    showArticleFormScreen:boolean;
    showRestaurantFormScreen:boolean;
    showSettingsScreen:boolean;
    showHistoriesScreen:boolean;
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
    showPaymentDrawer:false,
    adminLeftSidebar:false,
    showDashBoardScreen:false,
    showOrdersScreen:false,
    showSummariesScreen:false,
    showArticleFormScreen:false,
    showRestaurantFormScreen:false,
    showSettingsScreen:false,
    showHistoriesScreen:false,
  },
};

export const controlsSlice = createSlice({
  name: "controlsSlice",
  initialState,
  reducers: {
    updateControl: (state, action: PayloadAction<object>) => {
      state.values = { ...state.values, ...action.payload };
    },
    clearControls: () => {
      return initialState;
    },
  },
});

export const { updateControl, clearControls } = controlsSlice.actions;

export default controlsSlice.reducer;
