import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        staff: [],
        lastStaffFetched: null,
    },
    reducers: {
        setStaff: (state, action) => {
            state.staff = Array.isArray(action.payload) ? action.payload : [];
            state.lastStaffFetched = Date.now();
        },
    },
});

export const { setStaff } = staffSlice.actions;
export default staffSlice.reducer;