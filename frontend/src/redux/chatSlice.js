import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch users
export const fetchUsers = createAsyncThunk(
  'chat/fetchUsers',
  async ({ API_BASE_URL }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing. Please sign in again.');
      }

      const response = await axios.get(`${API_BASE_URL}/api/support`, {
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

export const fetchAdminsUsers = createAsyncThunk(
  'caht/fetchAdminsUsers',
  async ({ API_BASE_URL }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      // console.log('Token being sent:', token);
      if (!token) throw new Error('Missing token');

      const response = await axios.get(`${API_BASE_URL}/api/admins/available`, {
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
      console.error('Full error:', error.response?.data || error.message); // Debug line
      return rejectWithValue(error.message);
    }
  }
);

// Fetch recent messages
export const fetchRecentMessages = createAsyncThunk(
  'chat/fetchRecentMessages',
  async ({ API_BASE_URL, currentUserId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing. Please sign in again.');
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/chats/recent/${currentUserId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success || !Array.isArray(response.data.data)) {
        throw new Error(response.data.message || 'Invalid response data');
      }

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while fetching recent messages.');
    }
  }
);

// Mark messages as seen
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
  isChatPopupOpen: false,
  selectedUser: null,
  notifications: [], // Persist notifications
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateUnreadCount: (state, action) => {
      const { userId, count } = action.payload;
      state.unreadCounts[userId] = count;
    },
    addNotification: (state, action) => {
      const notification = action.payload;
      // Avoid duplicates by sender ID
      state.notifications = [
        notification,
        ...state.notifications.filter(n => n.user._id !== notification.user._id)
      ].sort((a, b) => b.timestamp - a.timestamp);
    },
    resetChatState: () => initialState,
    openChatPopup: (state) => {
      state.isChatPopupOpen = true;
    },
    closeChatPopup: (state) => {
      state.isChatPopupOpen = false;
      state.selectedUser = null;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
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
        action.payload.forEach(user => {
          state.unreadCounts[user._id] = user.unreadCount || 0;
        });
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Recent Messages
      .addCase(fetchRecentMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.map((msg) => ({
          id: msg._id,
          user: {
            _id: msg.sender._id,
            fullName: msg.sender.fullName,
            image: msg.sender.image,
            role: msg.sender.role,
          },
          title: msg.sender.fullName,
          message: msg.content.length > 50 ? `${msg.content.substring(0, 50)}...` : msg.content,
          type: 'message',
          timestamp: msg.timestamp,
          seen: msg.seen,
        })).sort((a, b) => b.timestamp - a.timestamp);
      })
      .addCase(fetchRecentMessages.rejected, (state, action) => {
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
        state.users = state.users.map(user => {
          if (user._id === otherUserId) {
            return { ...user, unreadCount: 0 };
          }
          return user;
        });
        // Mark notifications as seen
        state.notifications = state.notifications.map(notification => {
          if (notification.user._id === otherUserId) {
            return { ...notification, seen: true };
          }
          return notification;
        });
      })
      .addCase(markMessagesAsSeen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateUnreadCount,
  addNotification,
  resetChatState,
  openChatPopup,
  closeChatPopup,
  setSelectedUser,
} = chatSlice.actions;

export const selectUnreadCount = (userId) => (state) => state.chat.unreadCounts[userId] || 0;
export const selectTotalUnreadCount = (state) => 
  Object.values(state.chat.unreadCounts).reduce((sum, count) => sum + count, 0);
export const selectIsChatPopupOpen = (state) => state.chat.isChatPopupOpen;
export const selectSelectedUser = (state) => state.chat.selectedUser;
export const selectNotifications = (state) => state.chat.notifications;

export default chatSlice.reducer;