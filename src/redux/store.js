import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import popupSlice from "./slices/popupSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    popup: popupSlice,
  },
});

export default store;
