import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    lastMessageFetched: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = Array.isArray(action.payload) ? action.payload : [];
      state.lastMessageFetched = Date.now();
    },
  },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;