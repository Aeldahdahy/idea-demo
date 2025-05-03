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

            // Normalize investorPreference (relaxed industries validation)
            const investorPreference = clientData?.investorPreference &&
                clientData.investorPreference.investorType &&
                typeof clientData.investorPreference.minInvestment === 'number' &&
                typeof clientData.investorPreference.maxInvestment === 'number' &&
                Array.isArray(clientData.investorPreference.industries) &&
                clientData.investorPreference.industries.length > 0
                ? {
                    investorType: clientData.investorPreference.investorType,
                    minInvestment: clientData.investorPreference.minInvestment,
                    maxInvestment: clientData.investorPreference.maxInvestment,
                    industries: clientData.investorPreference.industries,
                  }
                : null;

            // Normalize clientData
            const normalizedClientData = clientData ? {
                ...clientData,
                investorPreference,
                yearsOfExperience: clientData.yearsOfExperience || '0-1',
                socialAccounts: clientData.socialAccounts || [''],
                country: clientData.country || '',
                city: clientData.city || '',
                entrepreneurPreference: clientData.entrepreneurPreference || null,
                fullName: clientData.fullName || null,
                email: clientData.email || null,
                phone: clientData.phone || null,
                address: clientData.address || null,
                biography: clientData.biography || null,
                date_of_birth: clientData.date_of_birth || null,
                education: clientData.education || null,
                experience: clientData.experience || null,
                national_id: clientData.national_id || null,
                image: clientData.image || null,
                status: clientData.status || null,
                firstLogin: clientData.firstLogin ?? null,
            } : null;

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
            if (!state.clientData) {
                console.warn('updateClientData called with no existing clientData');
                return;
            }

            // Normalize investorPreference in updates (strict 3 industries for updates)
            const investorPreference = action.payload.investorPreference &&
                action.payload.investorPreference.investorType &&
                typeof action.payload.investorPreference.minInvestment === 'number' &&
                typeof action.payload.investorPreference.maxInvestment === 'number' &&
                Array.isArray(action.payload.investorPreference.industries) &&
                action.payload.investorPreference.industries.length === 3
                ? {
                    investorType: action.payload.investorPreference.investorType,
                    minInvestment: action.payload.investorPreference.minInvestment,
                    maxInvestment: action.payload.investorPreference.maxInvestment,
                    industries: action.payload.investorPreference.industries,
                  }
                : state.clientData.investorPreference;

            const updatedClientData = {
                ...state.clientData,
                ...action.payload,
                investorPreference,
                yearsOfExperience: action.payload.yearsOfExperience || state.clientData.yearsOfExperience || '0-1',
                socialAccounts: action.payload.socialAccounts || state.clientData.socialAccounts || [''],
                country: action.payload.country || state.clientData.country || '',
                city: action.payload.city || state.clientData.city || '',
            };

            state.clientData = updatedClientData;
            localStorage.setItem('clientData', JSON.stringify(updatedClientData));
        },
    },
});

export const { setClientAuth, clearClientAuth, updateClientData } = clientAuthSlice.actions;
export default clientAuthSlice.reducer;