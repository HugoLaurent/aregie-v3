import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// FETCH RECETTES
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

// FETCH RECETTE BY ID
export const fetchRecetteById = createAsyncThunk(
  "recette/fetchRecetteById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/recette/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch recette");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// CREATE RECETTE
export const createRecette = createAsyncThunk(
  "recette/createRecette",
  async (formData, { rejectWithValue }) => {
    console.log("je passe par la");

    console.log(formData);
    const response = await fetch(
      "http://localhost:3000/recette/create-recette",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    console.log(response);

    if (response.status !== 200) {
      const errorData = await response.json();
      console.log(errorData);

      return rejectWithValue(errorData.message || "Failed to create recette");
    }

    return await response.json();
  }
);

// UPDATE RECETTE
export const updateRecette = createAsyncThunk(
  "recette/updateRecette",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/recette/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update recette");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const initialState = {
  data: [],
  status: "neutral", // 'loading', 'succeeded', 'failed'
  error: null,
};

const recetteSlice = createSlice({
  name: "recette",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL RECETTES
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
      })

      // FETCH RECETTE BY ID
      .addCase(fetchRecetteById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecetteById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(fetchRecetteById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown Error";
      })

      // CREATE RECETTE
      .addCase(createRecette.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createRecette.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(createRecette.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown Error";
      })

      // UPDATE RECETTE
      .addCase(updateRecette.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateRecette.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.data.findIndex(
          (recette) => recette.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateRecette.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown Error";
      });
  },
});

export default recetteSlice.reducer;
