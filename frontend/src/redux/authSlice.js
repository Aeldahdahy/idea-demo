import { createSlice } from '@reduxjs/toolkit';

// Helper to safely load a string value from localStorage
function loadItem(key, defaultValue = null) {
  const raw = localStorage.getItem(key);
  return raw !== null ? raw : defaultValue;
}

// Helper to safely load JSON from localStorage, with fallback
function loadJSONItem(key, defaultValue = []) {
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
  id: loadItem('userId'),
  fullName: loadItem('fullName'),
  email: loadItem('email'),
  image: loadItem('image'),
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

      console.log('authSlice.login: payload=', {
        role,
        userRole,
        id,
        email,
      });

      // Update state
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

      // Persist to localStorage
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
      // Reset state values
      Object.assign(state, {
        isAuthenticated: false,
        token: null,
        username: null,
        role: null,
        userRole: null,
        id: null,
        fullName: null,
        email: null,
        image: null,
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
      ].forEach((key) => localStorage.removeItem(key));
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;