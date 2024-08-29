import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/components/modalSlice";
import popupSlice from "./slices/components/popupSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    popup: popupSlice,
  },
});

export default store;
