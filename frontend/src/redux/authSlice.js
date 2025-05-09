import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('authToken'),
    token: localStorage.getItem('authToken') || null,
    username: localStorage.getItem('username') || null,
    role: localStorage.getItem('portalType') || null, // 'employee'
    userRole: localStorage.getItem('userRole') || null, // 'Admin'
    id: localStorage.getItem('userId') || null,
    fullName: localStorage.getItem('fullName') || null,
    email: localStorage.getItem('email') || null,
    image: localStorage.getItem('image') || null,
    permissions: JSON.parse(localStorage.getItem('permissions') || '[]'),
    status: localStorage.getItem('status') || null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const {
                token,
                username,
                role, // 'employee'
                userRole, // actual role like 'Admin'
                id,
                fullName,
                email,
                image,
                permissions,
                status,
            } = action.payload;
        
            state.isAuthenticated = true;
            state.token = token;
            state.username = username;
            state.role = role;
            state.userRole = userRole;
            state.id = id;
            state.fullName = fullName;
            state.email = email;
            state.image = image;
            state.permissions = permissions;
            state.status = status;
        
            localStorage.setItem('authToken', token);
            localStorage.setItem('username', username);
            localStorage.setItem('portalType', role);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userId', id);
            localStorage.setItem('fullName', fullName);
            localStorage.setItem('email', email);
            localStorage.setItem('image', image);
            localStorage.setItem('permissions', JSON.stringify(permissions));
            localStorage.setItem('status', status);
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