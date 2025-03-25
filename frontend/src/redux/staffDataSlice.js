import { createSlice } from "@reduxjs/toolkit";

const staffDataSlice = createSlice({
  name: "staffData",
  initialState: {
    isOpenStaff: false,
    header: "",
    buttonText: "",
    typeStaff: "",
    initialStaffData: {},
  },
  reducers: {
    openStaffData: (state, action) => {
      state.isOpenStaff = true;
      state.header = action.payload.header;
      state.buttonText = action.payload.buttonText;
      state.typeStaff = action.payload.typeStaff;
      state.initialStaffData = action.payload.initialStaffData || {};
    },
    closeStaffData: (state) => {
      state.isOpenStaff = false;
      state.header = "";
      state.buttonText = "";
      state.typeStaff = "";
      state.initialStaffData = {};
    },
  },
});

export const { openStaffData, closeStaffData } = staffDataSlice.actions;
export default staffDataSlice.reducer;