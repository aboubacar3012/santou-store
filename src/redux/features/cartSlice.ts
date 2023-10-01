import { CartType, ProductType, ProductTypeInCart } from "@/types/cart.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: CartType = {
  userId: "",
  products: [],
  amount: 0,
  deliveryCharge: 0,
  totalAmount: 0,
};

const updateTotalPrice = (state: CartType) => {
  state.amount = 0;
  state.products.forEach((p) => {
    state.amount += p.price * p.quantity;
  });
  state.totalAmount = state.amount + state.deliveryCharge;
};

const checkIfProductAlreadyInCartAndUpdateQuantity = (
  state: CartType,
  product: ProductTypeInCart
) => {
  const index = state.products.findIndex((p) => p.id === product.id);
  if (index !== -1) {
    state.products[index].quantity += product.quantity;
  } else {
    state.products.push(product);
  }
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductTypeInCart>) => {
      checkIfProductAlreadyInCartAndUpdateQuantity(state, action.payload);
      updateTotalPrice(state);
      return state;
    },
    removeFromCart: (state, action: PayloadAction<ProductType>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
      updateTotalPrice(state);
      return state;
    },

    clearCart: () => {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
