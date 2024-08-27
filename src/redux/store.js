import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalReducer";
import popupReducer from "./reducers/popupReducer";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    popup: popupReducer,
  },
});

export default store;
