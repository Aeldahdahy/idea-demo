import { createSlice } from '@reduxjs/toolkit';

const clientDataSlice = createSlice({
  name: 'clientData',
  initialState: {
    isOpenClient: false,
    typeClient: '',
    initialClientData: {},
  },
  reducers: {
    openClientData: (state, action) => {
      state.isOpenClient = true;
      state.typeClient = action.payload.typeClient;
      state.initialClientData = action.payload.initialClientData || {};
    },
    closeClientData: (state) => {
      state.isOpenClient = false;
      state.typeClient = '';
      state.initialClientData = {};
    },
    updateClientData: (state, action) => {
      state.clientData = action.payload;
    },
  },
});

export const { openClientData, closeClientData, updateClientData } = clientDataSlice.actions;
export default clientDataSlice.reducer;