import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import rawSkills from "../../../data/raw/skills.json";

type State = typeof rawSkills;

const initialState: State = rawSkills;

const slice = createSlice({
  name: "skilltree",
  initialState,
  reducers: {
    tierChanged(state, action: PayloadAction<{ id: string; tier: number }>) {
      const { id, tier } = action.payload;
      const skill = state.find((s) => s.id === id);
      if (!skill) {
        return;
      }
      skill.tier = tier;
    },
    requirementToggled(
      state,
      action: PayloadAction<{ id: string; requirement: string }>
    ) {
      const { id, requirement } = action.payload;
      const skill = state.find((s) => s.id === id);
      if (!skill) {
        return;
      }
      const hasRequired = skill.requiredSkills.some(
        (r) => r.toLocaleLowerCase() === requirement.toLowerCase()
      );
      if (hasRequired) {
        // remove requirement
        skill.requiredSkills = skill.requiredSkills.filter(
          (r) => r.toLocaleLowerCase() != requirement.toLocaleLowerCase()
        );
      } else {
        // add requirement
        skill.requiredSkills.push(requirement);
      }
    },
  },
});

export const { tierChanged, requirementToggled } = slice.actions;

export const selectSkillsByTier =
  (tier: number) => (state: { skilltree: State }) =>
    state.skilltree.filter((s) => s.tier === tier);

export default slice.reducer;
