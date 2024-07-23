import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../components/firebase';
import { getDoc, doc } from 'firebase/firestore';

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: true,
  userData: null,
  userDataLoading: false,
  userDataError: null,
};

// Async Thunks
export const fetchUserData = createAsyncThunk('user/fetchUserData', async (uid, { rejectWithValue }) => {
  try {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { uid, email, displayName } = action.payload || {};
      state.user = { uid, email, displayName };
      state.isLoggedIn = !!action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.userDataLoading = true;
        state.userDataError = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.userDataLoading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.userDataError = action.payload;
        state.userDataLoading = false;
      });
  },
});

// Actions
export const { setUser, clearUser, setLoading } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectLoading = (state) => state.user.loading;
export const selectUserData = (state) => state.user.userData;
export const selectUserDataLoading = (state) => state.user.userDataLoading;
export const selectUserDataError = (state) => state.user.userDataError;

export const listenForAuthChanges = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const { uid, email, displayName } = user;
      dispatch(setUser({ uid, email, displayName }));
      dispatch(fetchUserData(uid)).finally(() => {
        dispatch(setLoading(false)); // Set loading to false after fetching user data
      });
    } else {
      dispatch(clearUser());
      dispatch(setLoading(false)); // Set loading to false if no user is logged in
    }
  });
};


export default userSlice.reducer;
