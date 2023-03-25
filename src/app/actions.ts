import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateInvestments } from "../features/investments/InvestmentsSlice";
import { RootState } from "./store";

export const dayPassed = createAsyncThunk<void, void, { state: RootState }>(
  "app/dayPassed",
  (arg, api) => {
    api.dispatch(updateInvestments());
  }
);
