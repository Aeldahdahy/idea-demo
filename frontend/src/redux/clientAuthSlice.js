import { createSlice } from '@reduxjs/toolkit';

const clientAuthSlice = createSlice({
    name: 'clientAuth',
    initialState: {
        isAuthenticated: !!localStorage.getItem('authToken'),
        clientData: JSON.parse(localStorage.getItem('clientData')) || null,
    },
    reducers: {
        setClientAuth: (state, action) => {
            const { clientData } = action.payload;
            state.isAuthenticated = true;
            state.clientData = clientData;

            localStorage.setItem('clientData', JSON.stringify(clientData));
        },
        clearClientAuth: (state) => {
            state.isAuthenticated = false;
            state.clientData = null;

            localStorage.removeItem('clientData');
        },
    },
});

export const { setClientAuth, clearClientAuth } = clientAuthSlice.actions;
export default clientAuthSlice.reducer;