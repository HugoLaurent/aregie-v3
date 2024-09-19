import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/components/modalSlice";
import popupSlice from "./slices/components/popupSlice";
import recetteSlice from "./slices/recettes/recetteSlice";
import authSlice from "./slices/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    popup: popupSlice,
    recettes: recetteSlice,
  },
});

export default store;
