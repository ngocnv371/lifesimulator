import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import config from "../../app/config";
import { invest } from "../investments/InvestmentsSlice";

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
      state.money -= action.payload.amount;
      const fee = Math.ceil(
        (action.payload.amount * config.investment.agencyCutPercentage) / 100
      );
      state.money -= fee;
    });
  },
});

export const { addMoney, removeMoney } = slice.actions;

export default slice.reducer;
