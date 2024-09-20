import { configureStore } from "@reduxjs/toolkit";
import selectedCoinsSlice from "./selectedCoinsSlice";

export default configureStore({
  reducer: {
    selectedCoins: selectedCoinsSlice,
  },
});
