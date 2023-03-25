import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import config from "../../app/config";
import { Investment } from "../../app/models";
import { fluctuate } from "../../app/utils";
import { generateInvestment } from "../../data/investments";

type State = Investment[];

const initialState: State = Array(config.investment.numberOfInvestments)
  .fill(1)
  .map((k) => generateInvestment());

const slice = createSlice({
  name: "investments",
  initialState,
  reducers: {
    profitUpdated(
      state,
      action: PayloadAction<{ id: string; percentage: number }[]>
    ) {
      for (let i = 0; i < action.payload.length; i++) {
        const { id, percentage } = action.payload[i];

        const investment = selectInvestmentById(id)({ investments: state });
        if (!investment) {
          return;
        }

        investment.minAmount += Math.floor(
          (percentage * investment.minAmount) / 100
        );
        if (investment.invested) {
          investment.invested += Math.floor(
            (percentage * investment.invested) / 100
          );
        }
      }
    },
    invest(state, action: PayloadAction<{ id: string; amount: number }>) {
      const { id, amount } = action.payload;
      const investment = selectInvestmentById(id)({ investments: state });
      if (!investment) {
        return;
      }

      investment.invested += amount;
    },
    withdraw(state, action: PayloadAction<{ id: string; amount: number }>) {
      const { id, amount } = action.payload;
      const investment = selectInvestmentById(id)({ investments: state });
      if (!investment) {
        return;
      }

      const prevAmount = investment.invested;
      if (prevAmount < amount) {
        return;
      }

      const remaining = prevAmount - amount;
      if (remaining < investment.minAmount) {
        return;
      }

      investment.invested = remaining;
    },
  },
});

export const updateInvestments = createAsyncThunk<
  void,
  void,
  { state: { investments: State } }
>("investments/update", (a, api) => {
  const investments = api.getState().investments.map((i) => {
    const { min, max } = i.profit;
    const percentage = fluctuate(min, max);
    return { id: i.id, percentage };
  });
  api.dispatch(slice.actions.profitUpdated(investments));
});

export const { invest, withdraw } = slice.actions;

export const selectInvestmentById =
  (id: string) => (state: { investments: State }) =>
    state.investments.find((i) => i.id === id);

export default slice.reducer;
