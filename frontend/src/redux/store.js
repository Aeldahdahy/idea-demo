import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import checkPopupSlice from './checkpopupSlice';
import userSlice from './userSlice';
import yesNoPopupSlice from './yesNoPopupSlice';
import messagesSlice from './messagesSlice';
import staffSlice from './staffSlice';
import projectSlice from './projectSlice';
import staffDataSlice from './staffDataSlice';
import ProjectDataSlice from './projectDataSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        checkPopup: checkPopupSlice,
        yesNoPopup: yesNoPopupSlice,
        users: userSlice, 
        messages: messagesSlice,
        staff: staffSlice,
        project: projectSlice,
        staffData: staffDataSlice,
        projectData: ProjectDataSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
});
