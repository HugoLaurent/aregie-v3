import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/components/modalSlice";
import popupSlice from "./slices/components/popupSlice";
import recetteSlice from "./slices/recettes/recetteSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    popup: popupSlice,
    recettes: recetteSlice,
  },
});

export default store;
