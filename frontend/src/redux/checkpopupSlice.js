import { createSlice } from '@reduxjs/toolkit';
import successGif from '../assets/gif-0.1.mp4';  // Correct path
import errorGif from '../assets/gif-0.3.mp4';      // Correct path
import warningGif from '../assets/gif-0.2.mp4';  // Correct path

const initialState = {
    isOpen: false,
    message: '',
    buttonText: 'Done',
    type: 'info',
    gif: successGif,  // Default to success GIF
};

const checkPopupSlice = createSlice({
    name: 'checkPopup',
    initialState,
    reducers: {
        openPopup: (state, action) => {
            const popupType = action.payload?.type || 'info';

            // Assign appropriate GIF based on popup type
            let gifSrc = successGif;
            if (popupType === 'error') gifSrc = errorGif;
            if (popupType === 'warning') gifSrc = warningGif;

            return {
                isOpen: true,
                message: action.payload?.message || 'Action completed successfully',
                buttonText: action.payload?.buttonText || 'Done',
                type: popupType,
                gif: gifSrc, // Set dynamic GIF
            };
        },
        closePopup: () => initialState,
    },
});

export const { openPopup, closePopup } = checkPopupSlice.actions;
export default checkPopupSlice.reducer;
