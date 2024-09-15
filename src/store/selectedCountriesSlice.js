import { createSlice } from '@reduxjs/toolkit';

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('selectedCountries');
    if (serializedState) {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
  }
  return [];
};

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('selectedCountries', serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

const selectedCountriesSlice = createSlice({
  name: 'selectedCountries',
  initialState: loadStateFromLocalStorage(),
  reducers: {
    addCountry: (state, action) => {
      const country = action.payload;
      if (!state.find((item) => item.cca2 === country.cca2)) {
        state.push(country);
        saveStateToLocalStorage(state);
      }
    },
    removeCountry: (state, action) => {
      const newState = state.filter((country) => country.cca2 !== action.payload);
      saveStateToLocalStorage(newState);
      return newState;
    },
  },
});

export const { addCountry, removeCountry } = selectedCountriesSlice.actions;
export default selectedCountriesSlice.reducer;
