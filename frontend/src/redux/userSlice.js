import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [], 
    lastUserFetched: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = Array.isArray(action.payload) ? action.payload : []; 
      state.lastUserFetched = Date.now();
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
