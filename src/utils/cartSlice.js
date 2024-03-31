import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Each item should have id, name, price, and quantity properties
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If item does not exist, add it to the cart
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload;
      const indexToRemove = state.items.findIndex(
        (item) => item.id === itemIdToRemove
      );

      if (indexToRemove !== -1) {
        // If item is found, remove it from the cart
        state.items.splice(indexToRemove, 1);
      }
    },
    clearCart: (state) => {
      // Clear the entire cart
      state.items = [];
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        // Update the quantity of the specified item
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, clearCart, updateItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
