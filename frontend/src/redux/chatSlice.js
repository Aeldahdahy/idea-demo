import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'chat/fetchUsers',
  async ({ API_BASE_URL }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing. Please sign in again.');
      }

      const response = await axios.get(`${API_BASE_URL}/api/users/available`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch users');
      }

      if (!Array.isArray(response.data.data)) {
        throw new Error('Invalid data format: Expected an array in response.data.data');
      }

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while fetching users.');
    }
  }
);

export const markMessagesAsSeen = createAsyncThunk(
  'chat/markMessagesAsSeen',
  async ({ API_BASE_URL, currentUserId, otherUserId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing. Please sign in again.');
      }

      const response = await axios.put(
        `${API_BASE_URL}/api/chats/mark-seen/${currentUserId}/${otherUserId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to mark messages as seen');
      }

      return { currentUserId, otherUserId };
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while marking messages as seen.');
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  lastFetched: null,
  unreadCounts: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateUnreadCount: (state, action) => {
      const { userId, count } = action.payload;
      state.unreadCounts[userId] = count;
    },
    resetChatState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.lastFetched = Date.now();
        
        // Update unread counts
        action.payload.forEach(user => {
          state.unreadCounts[user._id] = user.unreadCount || 0;
        });
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Mark Messages as Seen
      .addCase(markMessagesAsSeen.pending, (state) => {
        state.loading = true;
      })
      .addCase(markMessagesAsSeen.fulfilled, (state, action) => {
        state.loading = false;
        const { otherUserId } = action.payload;
        state.unreadCounts[otherUserId] = 0;
        
        // Update the user in the list to show no unread messages
        state.users = state.users.map(user => {
          if (user._id === otherUserId) {
            return { ...user, unreadCount: 0 };
          }
          return user;
        });
      })
      .addCase(markMessagesAsSeen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateUnreadCount, resetChatState } = chatSlice.actions;

export const selectUnreadCount = (userId) => (state) => state.chat.unreadCounts[userId] || 0;
export const selectTotalUnreadCount = (state) => 
  Object.values(state.chat.unreadCounts).reduce((sum, count) => sum + count, 0);

export default chatSlice.reducer;