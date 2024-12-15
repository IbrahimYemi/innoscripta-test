import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  categories: string[];
  sources: string[];
  authors: string[];
}

const initialState: PreferencesState = {
  categories: [],
  sources: [],
  authors: [],
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    setSources(state, action: PayloadAction<string[]>) {
      state.sources = action.payload;
    },
    setAuthors(state, action: PayloadAction<string[]>) {
      state.authors = action.payload;
    },
  },
});

export const { setCategories, setSources, setAuthors } = preferencesSlice.actions;
export default preferencesSlice.reducer;