import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch recette asynchronously
export const fetchRecettes = createAsyncThunk(
  "recette/fetchRecettes",
  async () => {
    const response = await fetch("http://localhost:3000/recette", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }
);

const initialState = {
  data: [],
  status: "neutral",

  error: null,
};

const recetteSlice = createSlice({
  name: "recette",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecettes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecettes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchRecettes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown Error";
      });
  },
});

export default recetteSlice.reducer;
