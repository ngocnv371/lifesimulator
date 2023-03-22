import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { addMoney, removeMoney } = slice.actions;

export default slice.reducer;
