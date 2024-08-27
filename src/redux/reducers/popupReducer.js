import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isOpen: false,
    popupProps: {},
  },
  reducers: {
    openPopup: (state, action) => {
      state.isOpen = true;
      state.popupProps = action.payload;
    },
    closePopup: (state) => {
      state.isOpen = false;
      state.popupProps = {};
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
