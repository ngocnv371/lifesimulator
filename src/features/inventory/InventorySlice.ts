import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import config from "../../app/config";
import { invest, withdraw } from "../investments/InvestmentsSlice";

type State = {
  money: number;
};

const initialState: State = {
  money: 0,
};

const slice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addMoney(state, action: PayloadAction<number>) {
      state.money += action.payload;
    },
    removeMoney(state, action: PayloadAction<number>) {
      state.money -= action.payload;
      if (state.money < 0) {
        state.money = 0;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(invest, (state, action) => {
      const fee = Math.ceil(
        (action.payload.amount * config.investment.agencyCutPercentage) / 100
      );
      const real = action.payload.amount + fee;
      state.money -= real;
    });
    builder.addCase(withdraw, (state, action) => {
      const fee = Math.ceil(
        (action.payload.amount * config.investment.agencyCutPercentage) / 100
      );
      const tax = Math.ceil(
        (action.payload.amount * config.investment.salesTaxPercentage) / 100
      );
      const real = action.payload.amount - tax - fee;
      state.money += real;
    });
  },
});

export const { addMoney, removeMoney } = slice.actions;

export default slice.reducer;
