import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import checkPopupSlice from './checkpopupSlice';
import userSlice from './userSlice'; // Fix import

export const store = configureStore({
    reducer: {
        auth: authSlice,
        checkPopup: checkPopupSlice,
        users: userSlice, // Fix reducer name
    },
    devTools: process.env.NODE_ENV !== 'production', // Improved devTools setup
});
