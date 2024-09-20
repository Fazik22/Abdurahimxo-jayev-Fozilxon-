import { createSlice } from '@reduxjs/toolkit';

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('selectedCoins');
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
    localStorage.setItem('selectedCoins', serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

const selectedCoinsSlice = createSlice({
  name: 'selectedCoins',
  initialState: loadStateFromLocalStorage(),
  reducers: {
    addCoin: (state, action) => {
      const coin = action.payload;
      if (!state.find((item) => item.id === coin.id)) {
        state.push(coin);
        saveStateToLocalStorage(state);
      }
    },
    removeCoin: (state, action) => {
      const newState = state.filter((coin) => coin.id !== action.payload);
      saveStateToLocalStorage(newState);
      return newState;
    },
  },
});

export const { addCoin, removeCoin } = selectedCoinsSlice.actions;
export default selectedCoinsSlice.reducer;
