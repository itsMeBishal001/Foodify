// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { db } from '../components/firebase';
// import { doc, getDoc, setDoc } from 'firebase/firestore';

// // Fetch user's cart from Firebase
// export const fetchUserCart = createAsyncThunk(
//   'cart/fetchUserCart',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const cartRef = doc(db, 'carts', userId);
//       const docSnap = await getDoc(cartRef);
//       if (docSnap.exists()) {
//         return docSnap.data().items;
//       } else {
//         return [];
//       }
//     } catch (error) {
//       return rejectWithValue('Failed to fetch cart data');
//     }
//   }
// );

// // Save user's cart to Firebase
// export const saveUserCart = createAsyncThunk(
//   'cart/saveUserCart',
//   async ({ userId, items }, { rejectWithValue }) => {
//     try {
//       const cartRef = doc(db, 'carts', userId);
//       await setDoc(cartRef, { items });
//     } catch (error) {
//       return rejectWithValue('Failed to save cart data');
//     }
//   }
// );

// const initialState = {
//   items: [],
//   status: 'idle',
//   error: null,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItem: (state, action) => {
//       const newItem = action.payload;
//       const existingItem = state.items.find((item) => item.id === newItem.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...newItem, quantity: 1 });
//       }
//     },
//     removeItem: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//     updateItemQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const item = state.items.find((item) => item.id === id);
//       if (item) {
//         item.quantity = quantity;
//       }
//     },
//     setCart: (state, action) => {
//       state.items = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserCart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUserCart.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.status = 'succeeded';
//       })
//       .addCase(fetchUserCart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(saveUserCart.pending, (state) => {
//         state.status = 'saving';
//       })
//       .addCase(saveUserCart.fulfilled, (state) => {
//         state.status = 'idle';
//       })
//       .addCase(saveUserCart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { addItem, removeItem, clearCart, updateItemQuantity, setCart } = cartSlice.actions;

// export const syncCartWithFirebase = (userId, cartItems) => async (dispatch) => {
//   try {
//     await dispatch(saveUserCart({ userId, items: cartItems }));
//   } catch (error) {
//     console.error('Error syncing cart with Firebase:', error);
//   }
// };

// export default cartSlice.reducer;

// src/store/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../components/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Thunk for fetching the cart from Firebase
export const fetchUserCart = createAsyncThunk(
  'cart/fetchUserCart',
  async (userId) => {
    const cartRef = doc(db, 'carts', userId);
    const docSnap = await getDoc(cartRef);
    return docSnap.exists() ? docSnap.data().items : [];
  }
);

// Thunk for saving the cart to Firebase
export const saveUserCart = createAsyncThunk(
  'cart/saveUserCart',
  async ({ userId, items }) => {
    const cartRef = doc(db, 'carts', userId);
    await setDoc(cartRef, { items });
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) item.quantity = quantity;
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(saveUserCart.fulfilled, (state) => {
        // Optionally handle success state
      });
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;

// Thunk to sync cart with Firebase
export const syncCartWithFirebase = (userId, cartItems) => async (dispatch) => {
  console.log("userId",userId, "cartItems:",cartItems)
  await dispatch(saveUserCart({ userId, items: cartItems }));
};

