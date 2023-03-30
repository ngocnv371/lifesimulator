import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getJobById, getJobs, getJobsBySkills } from "../../data/jobs";

type State = {
  id: string;
};

const initialState: State = {
  id: "",
};

const slice = createSlice({
  name: "job",
  initialState,
  reducers: {
    apply(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    quit(state) {
      state.id = "";
    },
  },
});

export const selectAvailableJobs = createSelector(
  [(state) => state.skills],
  (skills) => getJobs(skills)
);

export const selectJob = (state: { job: State }) => getJobById(state.job.id);

export const { apply, quit } = slice.actions;

export default slice.reducer;
