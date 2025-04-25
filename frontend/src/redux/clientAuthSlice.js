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
            
            // Add null checks and default values
            const normalizedClientData = clientData ? {
              ...clientData,
            } : null; // Handle case where clientData is undefined

        
            state.isAuthenticated = !!normalizedClientData;
            state.clientData = normalizedClientData;
        
            if (normalizedClientData) {
              localStorage.setItem('clientData', JSON.stringify(normalizedClientData));
            } else {
              localStorage.removeItem('clientData');
            }
          },
        clearClientAuth: (state) => {
            state.isAuthenticated = false;
            state.clientData = null;

            localStorage.removeItem('authToken');
            localStorage.removeItem('clientData');
        },
        updateClientData: (state, action) => {
            const updatedClientData = {
                ...state.clientData,
                ...action.payload,
            };

            state.clientData = updatedClientData;
            localStorage.setItem('clientData', JSON.stringify(updatedClientData));
        }
    },
});

export const { setClientAuth, clearClientAuth, updateClientData } = clientAuthSlice.actions;
export default clientAuthSlice.reducer;