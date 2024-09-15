import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  selectedCountries: [],
  loading: false,
  error: null,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default countriesSlice.reducer;
export const {
  setCountries,
  setLoading,
  setError,
} = countriesSlice.actions;
