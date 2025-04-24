import { createSlice } from '@reduxjs/toolkit';

const projectDataSlice = createSlice({
    name: "projectData",
    initialState: {
        isOpen: false,
        header: "",
        buttonText: "",
        type: "",
        initialData: {}, 
    },
    reducers: {
        openProjectData: (state, action) => {
            state.isOpen = true;
            state.header = action.payload.header || "";
            state.buttonText = action.payload.buttonText || "";
            state.type = action.payload.type || "";
            state.initialData = action.payload.initialData || {};
        },
        closeProjectData: (state) => {
            state.isOpen = false;
            state.header = "";
            state.buttonText = "";
            state.type = "";
            state.initialData = {};
        },
    },
});

export const { openProjectData, closeProjectData } = projectDataSlice.actions;
export default projectDataSlice.reducer;