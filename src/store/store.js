import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./countriesSlice";
import selectedCountriesSlice from "./selectedCountriesSlice";

export default configureStore({
  reducer: {
    countries: countriesSlice,
    selectedCountries: selectedCountriesSlice,
  },
});
