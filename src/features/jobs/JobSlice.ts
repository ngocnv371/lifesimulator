import { createSlice } from "@reduxjs/toolkit";

type State = {
  id: string;
};

const initialState: State = {
  id: "",
};

const slice = createSlice({
  name: "job",
  initialState,
  reducers: {},
});

export default slice.reducer;
