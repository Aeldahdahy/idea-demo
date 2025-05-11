import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from '../../Common/Card';

function ClientInvestorMyInvestment() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:7030';

  // Fetch investor meetings
  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const response = await axios.get(`${API_BASE_URL}/api/investor-meetings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMeetings(response.data.data || []);
      setError(null);
    } catch (err) {
      if (err.response?.status === 403) {
        setError('Access forbidden. Please log in again or contact support.');
        toast.error('Access forbidden. Please log in again.');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch investor meetings');
        toast.error(err.response?.data?.message || 'Failed to load meetings');
      }
      setMeetings([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch meetings on mount
  useEffect(() => {
    fetchMeetings();
  }, []);

  // Handle retry on error
  const handleRetry = () => {
    fetchMeetings();
  };

  // Group meetings by status
  const meetingsByStatus = meetings.reduce((acc, meeting) => {
    const status = meeting.status || 'Other';
    if (!acc[status]) acc[status] = [];
    acc[status].push(meeting);
    return acc;
  }, {});

  // Map status to display names
  const statusDisplayNames = {
    Requested: 'Requested',
    SlotsSentToInvestor: 'Awaiting Your Slot Selection',
    SlotsSelectedByInvestor: 'Awaiting Entrepreneur Confirmation',
    SlotConfirmedByEntrepreneur: 'Slot Confirmed',
    Scheduled: 'Scheduled',
    Completed: 'Completed',
    Cancelled: 'Cancelled',
    Other: 'Other'
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            My Meeting Requests
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-200">
            View and manage your scheduled meetings with entrepreneurs
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16 bg-red-50 rounded-2xl shadow-lg">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="mt-4 text-lg font-medium text-red-800">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label="Retry loading meetings"
            >
              Retry
            </button>
            {error?.includes('log in') && (
              <button
                onClick={() => window.location.href = '/login'}
                className="ml-4 mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Log in"
              >
                Log In
              </button>
            )}
          </div>
        )}

        {/* No Meetings State */}
        {!loading && !error && meetings.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-900">
              0 projects have been scheduled or requested
            </p>
          </div>
        )}

        {/* Meetings Grid (only after loading completes and there are meetings) */}
        {!loading && !error && meetings.length > 0 && (
          <div className="space-y-12">
            {Object.entries(meetingsByStatus).map(([status, meetings]) => (
              <div key={status} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-blue-900">
                    {statusDisplayNames[status] || status}
                    <span className="ml-3 text-sm font-normal text-gray-600">
                      ({meetings.length} {meetings.length === 1 ? 'meeting' : 'meetings'})
                    </span>
                  </h2>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {meetings.map((meeting) => (
                      <div
                        key={meeting._id}
                        className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-lg"
                      >
                        <Card project={meeting.project_id} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientInvestorMyInvestment;