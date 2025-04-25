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
import meetingDataReducer from './meetingDataSlice';
import clientDataSlice from './ClientDataSlice';
import clientAuthSlice  from './clientAuthSlice';
import ClientInvestorPreferences from './clientInvestorPreferencesSlice';

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
        meetingData: meetingDataReducer,
        clientData: clientDataSlice,
        clientAuth: clientAuthSlice, 
        clientInvestorPreferences: ClientInvestorPreferences,
    },
    devTools: process.env.NODE_ENV !== 'production',
});
