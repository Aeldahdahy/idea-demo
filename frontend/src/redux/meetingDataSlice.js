import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch meetings
export const fetchMeetings = createAsyncThunk(
  'meetingData/fetchMeetings',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch('https://idea-venture.agency/api/meetings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch meetings: ${response.statusText}`);
      }
      const { success, data } = await response.json();
      if (!success) {
        throw new Error('API returned unsuccessful response');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const meetingDataSlice = createSlice({
  name: 'meetingData',
  initialState: {
    meetingData: [],
    lastMeetingFetched: null,
    selectedAuditor: null,
    selectedMeetingId: null,
    slot1State: 'available',
    slot2State: 'available',
    isPopupOpen: false,
    status: 'idle', // Added for async thunk status
    error: null, // Added for async thunk error
  },
  reducers: {
    setMeetingData: (state, action) => {
      state.meetingData = Array.isArray(action.payload) ? action.payload : [];
      state.lastMeetingFetched = Date.now();
    },
    setSelectedAuditor: (state, action) => {
      state.selectedAuditor = action.payload;
    },
    setSelectedMeetingId: (state, action) => {
      state.selectedMeetingId = action.payload;
    },
    setSlot1State: (state, action) => {
      state.slot1State = action.payload;
    },
    setSlot2State: (state, action) => {
      state.slot2State = action.payload;
    },
    resetSlots: (state) => {
      state.slot1State = 'available';
      state.slot2State = 'available';
    },
    openPopup: (state) => {
      state.isPopupOpen = true;
    },
    closePopup: (state) => {
      state.isPopupOpen = false;
      state.selectedMeetingId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meetingData = Array.isArray(action.payload) ? action.payload : [];
        state.lastMeetingFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  setMeetingData,
  setSelectedAuditor,
  setSelectedMeetingId,
  setSlot1State,
  setSlot2State,
  resetSlots,
  openPopup,
  closePopup,
} = meetingDataSlice.actions;

export default meetingDataSlice.reducer;