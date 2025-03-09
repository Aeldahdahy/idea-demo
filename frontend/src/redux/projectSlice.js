import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: [],
    lastProjectFetched: null,
  },
  reducers: {
    setProject: (state, action) => {
      state.project = Array.isArray(action.payload) ? action.payload : [];
      state.lastProjectFetched = Date.now();
    },
  },
});

export const { setProject } = projectSlice.actions;
export default projectSlice.reducer;