import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//Retrieve user Info and user Token from localStorage if available
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//Check for an existing guestId in the localStorage or generate a new Id.
const initialGuestId =
  localStorage.getItem("guestId") || `guest${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

//Initial State
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

//Async Thunk for loginUser
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user; // retrur  the user object from response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Async Thunk for registerUser
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user; // return  the user object from response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//userSilce
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest${new Date().getTime()}`; //Reset guestId
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId); //set new guest ID in localStorage
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout, generateNewGuestId } = userSlice.actions;
export default userSlice.reducer;
