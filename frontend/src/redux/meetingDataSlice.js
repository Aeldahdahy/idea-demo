import { createSlice } from '@reduxjs/toolkit';

const meetingDataSlice = createSlice({
  name: 'meetingData',
  initialState: {
    meetingData: [],
    lastMeetingFetched: null,
    selectedAuditor: null,
    slot1State: 'available',
    slot2State: 'available',
    isPopupOpen: true, // Added state to track popup visibility
  },
  reducers: {
    setMeetingData: (state, action) => {
      state.meetingData = Array.isArray(action.payload) ? action.payload : [];
      state.lastMeetingFetched = Date.now();
    },
    setSelectedAuditor: (state, action) => {
      state.selectedAuditor = action.payload;
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
    openPopup: (state) => { // Added action to open the popup
      state.isPopupOpen = true;
    },
    closePopup: (state) => { // Added action to close the popup
      state.isPopupOpen = false;
    },
  },
});

export const { setMeetingData, setSelectedAuditor, setSlot1State, setSlot2State, resetSlots, openPopup, closePopup } = meetingDataSlice.actions;
export default meetingDataSlice.reducer;