import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import checkPopupSlice from './checkpopupSlice';
import userSlice from './userSlice';
import yesNoPopupSlice from './yesNoPopupSlice';
import messagesSlice from './messagesSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        checkPopup: checkPopupSlice,
        yesNoPopup: yesNoPopupSlice,
        users: userSlice, 
        messages: messagesSlice,
    },
    devTools: process.env.NODE_ENV !== 'production', // Improved devTools setup
});
