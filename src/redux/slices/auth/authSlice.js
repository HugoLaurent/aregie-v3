import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
  },
  reducers: {
    logUser: (state) => {
      state.isLogged = true;
    },
    logOutUser: (state) => {
      state.isLogged = false;
    },
  },
});

export const { logUser, logOutUser } = authSlice.actions;
export default authSlice.reducer;
