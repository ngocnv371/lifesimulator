import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rawSkills from "../../../data/raw/skills.json";
import rawJobs from "../../../data/raw/jobs.json";
import { RootState } from "../../../app/store";

interface TreeItem {
  id: string;
  name: string;
  requiredSkills: string[];
  tier: number;
}

type State = TreeItem[];

const initialState: State = [
  ...rawSkills,
  // ...rawJobs.map((j) => ({
  //   id: j.name.toLocaleLowerCase(),
  //   tier: 6,
  //   name: j.name,
  //   requiredSkills: j.requiredSkills,
  // })),
];

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
          (r) => r.toLocaleLowerCase() !== requirement.toLocaleLowerCase()
        );
      } else {
        // add requirement
        skill.requiredSkills.push(requirement);
      }
    },
    tier1RequirementsCleared(state) {
      state
        .filter((s) => s.tier === 1)
        .forEach((s) => {
          s.requiredSkills = [];
        });
    },
  },
});

export const exportJSON = createAsyncThunk<void, void, { state: RootState }>(
  "skilltree/exportJSON",
  (arg, api) => {
    console.log('skilltree/exportJSON')
    const skills = api.getState().skilltree;
    const jsonData = JSON.stringify(
      skills.slice().sort((a, b) => a.name.localeCompare(b.name)),
      null,
      2
    );
    console.log('json', jsonData)
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "skilltree.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('downloaded')
  }
);

export const { tierChanged, requirementToggled, tier1RequirementsCleared } =
  slice.actions;

export const selectSkillsByTier =
  (tier: number) => (state: { skilltree: State }) =>
    state.skilltree.filter((s) => s.tier === tier);

export const selectSkillById = (id: string) => (state: { skilltree: State }) =>
  state.skilltree.find((s) => s.id === id);

export default slice.reducer;
