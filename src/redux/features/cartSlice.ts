import { CartType } from "@/types/cart.type";
import { ProductType } from "@/types/product.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: CartType = {
  userId: "",
  products: [],
  amount: 0,
  deliveryCharge: 200,
  totalAmount: 0,
  indication: "",
  options:[]
};

const updateTotalPrice = (state: CartType) => {
  state.amount = 0;
  state.products.forEach((p) => {
    if (p.quantity && p.quantity > 0) state.amount += p.price * p.quantity;
  });
  let totalOptions = 0;
  if(state.products){
    state.products.map(product => {
      if(product.options){
        product.options.map(option => {
          if(option.values){
            const productQuantity = product.quantity ? product.quantity : 1;
            option.values.map((value) => {

              totalOptions += (value.price * productQuantity);
            })
          }
        })
      }
    })
  }
  state.amount = state.amount + totalOptions;
  state.totalAmount = state.amount + state.deliveryCharge;
};

// const checkIfProductAlreadyInCartAndUpdateQuantity = (
//   state: CartType,
//   product: ProductType
// ) => {
//   // verifier que le produit n'est pas déjà dans le panier, coparer directement le produit

//   const index = state.products.findIndex((p) => {
//     if (
//       p.id === product.id
//     )
//       return true;
//     else return false;
//   });
//   if (index !== -1) {
//     if (
//       state.products &&
//       state.products[index] &&
//       state.products[index]["quantity"]
//     ) {
//       const quantity = state.products[index]["quantity"]
//         ? state.products[index]["quantity"]
//         : 1;
//       const newQuantity = product.quantity ? product.quantity : 1;
//       state.products[index]["quantity"] = quantity && quantity + newQuantity;
//     }
//   } else {
//     state.products.push(product);
//   }
// };

// v2 
const checkIfProductAlreadyInCartAndUpdateQuantity = (
  state: CartType,
  product: ProductType
) => {
  const existingProductIndex = state.products.findIndex(
    (p) => JSON.stringify(p) === JSON.stringify(product)
  );

  if (existingProductIndex !== -1) {
    const existingProduct = state.products[existingProductIndex];
    if (existingProduct) {
      // Update quantity if the product already exists in the cart
      const newQuantity = product.quantity || 1;
      existingProduct.quantity = (existingProduct.quantity || 0) + newQuantity;
      // Here, you might also want to update other properties of the existing product if needed
    }
  } else {
    // Add the product to the cart if it doesn't exist
    state.products.push(product);
  }
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      checkIfProductAlreadyInCartAndUpdateQuantity(state, action.payload);
      updateTotalPrice(state);

      return state;
    },
    addUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
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
    updateProductQuantityWithProductId: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        if (action.payload.quantity === 0) {
          if (window.confirm("Voulez-vous supprimer ce produit du panier ?")) {
            state.products.splice(index, 1);
          }
        }
        if(action.payload.quantity > 0)
        state.products[index]["quantity"] = action.payload.quantity;
      }
      updateTotalPrice(state);
      return state;
    },
    clearCart: (state) => {
      state.products = [];
      state.amount = 0;
      state.deliveryCharge = 200;
      state.totalAmount = 0;
      state.indication = "";
      return state;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  addUserId,
  updateProductQuantityWithProductId,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
