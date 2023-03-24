import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInvestmentById } from "../../data/investments";

type State = Record<string, number>;

const initialState: State = {};

const slice = createSlice({
  name: "investments",
  initialState,
  reducers: {
    fluctuated(state, action: PayloadAction<{ id: string; amount: number }>) {
      const { id, amount } = action.payload;
      const investment = getInvestmentById(id);
      if (!investment || !state[id]) {
        return;
      }

      state[id] = state[id] + amount;
    },
    invest(state, action: PayloadAction<{ id: string; amount: number }>) {
      const { id, amount } = action.payload;
      const investment = getInvestmentById(id);
      if (!investment) {
        return;
      }

      const prevAmount = state[id];
      if (prevAmount) {
        state[id] = prevAmount + amount;
      } else if (amount >= investment.minAmount) {
        state[id] = amount;
      }
    },
    withdraw(state, action: PayloadAction<{ id: string; amount: number }>) {
      const { id, amount } = action.payload;
      const investment = getInvestmentById(id);
      if (!investment) {
        return;
      }

      const prevAmount = state[id];
      if (prevAmount < amount) {
        return;
      }

      const remaining = prevAmount - amount;
      if (!remaining) {
        // full withdrawal
        delete state[id];
      } else if (remaining < investment.minAmount) {
        return;
      }

      state[id] = remaining;
    },
  },
});

export const updateInvestments = createAsyncThunk<
  void,
  void,
  { state: { investments: State } }
>("investments/update", (a, api) => {
  const map = api.getState().investments;
  const investments = Object.keys(map).map((k) => ({
    ...getInvestmentById(k),
    amount: map[k],
  }));
  investments.forEach((i) => {
    const [min, max] = i.bounds;
    const length = max - min;
    const seed = Math.floor(Math.random() * length);
    const value = seed + min;
    const delta = Math.floor((i.amount * value) / 100);
    api.dispatch(slice.actions.fluctuated({ id: i.id, amount: delta }));
  });
});

export const { invest, withdraw } = slice.actions;

export default slice.reducer;
