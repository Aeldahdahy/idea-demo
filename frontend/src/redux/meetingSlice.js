// meetingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meetingStatus: null,
  meetingId: null,
  lastChecked: null, // Timestamp of the last status check
  suppressChecksUntil: null, // Timestamp to suppress checks
  error: null,
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    setMeetingStatus(state, action) {
      state.meetingStatus = action.payload.status;
      state.meetingId = action.payload.meetingId;
      state.lastChecked = Date.now();
      state.error = null;
    },
    suppressChecks(state, action) {
      state.suppressChecksUntil = action.payload; // Timestamp to suppress checks
    },
    clearMeetingStatus(state) {
      state.meetingStatus = null;
      state.meetingId = null;
      state.lastChecked = null;
      state.suppressChecksUntil = null;
      state.error = null;
    },
    setMeetingError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setMeetingStatus, suppressChecks, clearMeetingStatus, setMeetingError } = meetingSlice.actions;
export default meetingSlice.reducer;