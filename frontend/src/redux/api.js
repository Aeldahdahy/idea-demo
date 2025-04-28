import axios from 'axios';

// Base URL for your API (same as used in useFunctions.js)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; // Adjust if needed

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API methods for meeting-related endpoints
const api = {
  createMeeting: async (meetingData) => {
    const response = await apiClient.post('/api/create-meeting', meetingData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });
    return response;
  },

  cancelMeeting: async (meetingId) => {
    const response = await apiClient.delete(`/api/cancel-meeting/${meetingId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });
    return response;
  },

  getMeetingStatus: async (projectId, investorId, entrepreneurId) => {
    const response = await apiClient.get(
      `/api/meeting/status/${projectId}/${investorId}/${entrepreneurId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      }
    );
    return response;
  },
};

export default api;