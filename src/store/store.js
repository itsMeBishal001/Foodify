import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice"; // Import the user slice

const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice, // Add the user slice to the store
  },
});

export default store;
