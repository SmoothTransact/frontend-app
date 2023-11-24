"use client";

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    accessToken: "",
    refreshToken: null,
  },
  reducers: {
    dispatchIsLogged: (state) => {
      state.isLogged = true;
    },
    dispatchUserRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    dispatchUserToken: (state, action) => {
      state.accessToken = action.payload;
    },

    dispatchLogout: (state) => {
      state.isLogged = false;
    },
  },
});

export const {
  dispatchIsLogged,
  dispatchUserToken,
  dispatchUserRefreshToken,
  // dispatchUser,
  // dispatchUserId,
  dispatchLogout,
} = userSlice.actions;
export default userSlice.reducer;
