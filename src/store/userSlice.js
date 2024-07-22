import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../components/firebase';

// Initial state
const initialState = {
  user: null,
  isLoggedIn: false,
};

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Store only serializable user info
      const { uid, email, displayName } = action.payload || {};
      state.user = { uid, email, displayName };
      state.isLoggedIn = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

// Actions
export const { setUser, clearUser } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

// Async Thunks
export const listenForAuthChanges = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(clearUser());
    }
  });
};

export default userSlice.reducer;
