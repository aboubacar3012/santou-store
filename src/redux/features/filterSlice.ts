import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Filter = {
  category: string;
};

const initialState: Filter = {
  category: "all", // le nom de la catégorie pour filtrer les produits
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    updateCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      return state;
    },
    clearFilter: () => {
      return initialState;
    },
  },
});

export const { updateCategory, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
