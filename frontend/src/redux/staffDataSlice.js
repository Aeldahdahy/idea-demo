import { createSlice } from "@reduxjs/toolkit";

const staffDataSlice = createSlice({
  name: "staffData",
  initialState: {
    isOpen: false,
    header: "",
    buttonText: "",
    type: "",
    initialData: {},
  },
  reducers: {
    openStaffData: (state, action) => {
      state.isOpen = true;
      state.header = action.payload.header;
      state.buttonText = action.payload.buttonText;
      state.type = action.payload.type;
      state.initialData = action.payload.initialData || {};
    },
    closeStaffData: (state) => {
      state.isOpen = false;
      state.header = "";
      state.buttonText = "";
      state.type = "";
      state.initialData = {};
    },
  },
});

export const { openStaffData, closeStaffData } = staffDataSlice.actions;
export default staffDataSlice.reducer;