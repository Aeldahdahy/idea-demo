import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    message: "",
    buttonYes: "Yes",
    buttonNo: "No",
    type: "confirmation",
};

const yesNoPopupSlice = createSlice({
    name: "yesNoPopup",
    initialState,
    reducers: {
        openYesNoPopup: (state, action) => {
            return {
                isOpen: true,
                message: action.payload?.message || "Are you sure?",
                buttonYes: action.payload?.buttonYes || "Yes",
                buttonNo: action.payload?.buttonNo || "No",
                type: action.payload?.type || "confirmation",
            };
        },
        closePopup: () => initialState,
    },
});

export const { openYesNoPopup, closePopup } = yesNoPopupSlice.actions;
export default yesNoPopupSlice.reducer;