import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('authToken'),
    token: localStorage.getItem('authToken') || null,
    username : localStorage.getItem('username'),
    role : localStorage.getItem('portalType'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { token, role, username } = action.payload;
            state.isAuthenticated = true;
            state.token = token;
            state.username = username;
            state.role = role;

            localStorage.setItem('authToken', token);
            localStorage.setItem('username', username);
            localStorage.setItem('portalType', role);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.username = null;
            state.role = null;

            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            localStorage.removeItem('portalType');
        },
    },
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;