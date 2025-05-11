import { createSlice } from '@reduxjs/toolkit';

// Helper to safely load a string value from localStorage
function loadItem(key, defaultValue = null) {
  const raw = localStorage.getItem(key);
  return raw !== null ? raw : defaultValue;
}

// Helper to safely load JSON from localStorage, with fallback
function loadJSONItem(key, defaultValue = null) {
  const raw = localStorage.getItem(key);
  if (raw === null) return defaultValue;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to parse ${key} from localStorage`, e);
    return defaultValue;
  }
}

const initialState = {
  isAuthenticated: !!loadItem('authToken'),
  token: loadItem('authToken'),
  username: loadItem('username'),
  role: loadItem('portalType'),      // e.g., 'employee'
  userRole: loadItem('userRole'),   // e.g., 'Admin'
  user: loadJSONItem('user', null), // Store user object with _id, fullName, etc.
  permissions: loadJSONItem('permissions', []),
  status: loadItem('status'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const {
        token,
        username,
        role,
        userRole,
        id,
        fullName,
        email,
        image,
        permissions,
        status,
      } = action.payload;

      // Construct user object
      const user = {
        _id: id,
        fullName,
        email,
        image,
      };

      console.log('authSlice.login: payload=', {
        token,
        username,
        role,
        userRole,
        user,
        permissions,
        status,
      });

      // Clear all existing auth-related keys from localStorage
      [
        'authToken',
        'username',
        'portalType',
        'userRole',
        'userId',
        'fullName',
        'email',
        'image',
        'permissions',
        'status',
        'user',
      ].forEach((key) => localStorage.removeItem(key));

      // Update state
      state.isAuthenticated = true;
      state.token = token;
      state.username = username;
      state.role = role;
      state.userRole = userRole;
      state.user = user;
      state.permissions = permissions || [];
      state.status = status;

      // Persist to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('username', username);
      localStorage.setItem('portalType', role);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('permissions', JSON.stringify(permissions || []));
      localStorage.setItem('status', status);

      // Debug localStorage contents
      console.log('authSlice.login: localStorage=', {
        authToken: localStorage.getItem('authToken'),
        username: localStorage.getItem('username'),
        portalType: localStorage.getItem('portalType'),
        userRole: localStorage.getItem('userRole'),
        user: localStorage.getItem('user'),
        permissions: localStorage.getItem('permissions'),
        status: localStorage.getItem('status'),
      });
    },
    logout: (state) => {
      // Reset state values
      Object.assign(state, {
        isAuthenticated: false,
        token: null,
        username: null,
        role: null,
        userRole: null,
        user: null,
        permissions: [],
        status: null,
      });

      // Remove all auth-related keys from localStorage
      [
        'authToken',
        'username',
        'portalType',
        'userRole',
        'userId',
        'fullName',
        'email',
        'image',
        'permissions',
        'status',
        'user',
      ].forEach((key) => localStorage.removeItem(key));

      // Debug localStorage after logout
      console.log('authSlice.logout: localStorage cleared');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;