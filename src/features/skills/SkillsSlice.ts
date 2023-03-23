import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = Record<string, number>;

const initialState: State = {
  ["hoping"]: 9,
  ["dreaming"]: 9,
  ["canpicking"]: 1,
};

const slice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    levelUp(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state[id]) {
        state[id] = state[id] + 1;
      } else {
        state[id] = 1;
      }
    },
  },
});

export const { levelUp } = slice.actions;

export default slice.reducer;

export const selectSkillLevelById =
  (id: string) => (state: { skills: State }) => 
    state.skills[id];
