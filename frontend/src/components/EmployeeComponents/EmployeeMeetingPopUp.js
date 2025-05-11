import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMeetingData, setSelectedAuditor, setSlot1State, setSlot2State, resetSlots, closePopup, fetchMeetings } from '../../redux/meetingDataSlice';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

function EmployeeMeetingPopUp() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [auditors, setAuditors] = useState([]);
  const [submissionError, setSubmissionError] = useState(null);
  const [savedSlots, setSavedSlots] = useState([]);
  const dispatch = useDispatch();
  const { meetingData, selectedAuditor, selectedMeetingId, slot1State, slot2State, isPopupOpen } = useSelector((state) => state.meetingData);
  const token = useSelector((state) => state.auth.token);

  const timelineHours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
  const timeSlots = [
    { time: '09:00-11:00', state: slot1State, setState: (state) => dispatch(setSlot1State(state)), startHour: '09:00' },
    { time: '12:00-14:00', state: slot2State, setState: (state) => dispatch(setSlot2State(state)), startHour: '12:00' },
  ];
  const allowedDaysOfWeek = [1, 2, 3]; // Monday, Tuesday, Wednesday
  const isDayAllowed = selectedDate && allowedDaysOfWeek.includes(selectedDate.getDay());

  useEffect(() => {
    const fetchMeetings = async () => {
      if (!token) {
        setSubmissionError('Authentication token missing.');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:7030/api/meetings', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch meetings: ${response.statusText}`);
        }

        const { success, data } = await response.json();
        if (success) {
          dispatch(setMeetingData(data));
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (err) {
        setSubmissionError(err.message);
      }
    };

    fetchMeetings();
  }, [dispatch, token]);

  useEffect(() => {
    const fetchAuditors = async () => {
      if (!token) {
        setSubmissionError('Authentication token missing.');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:7030/api/staff/auditors', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch auditors: ${response.statusText}`);
        }

        const { success, data } = await response.json();
        if (success) {
          const auditorOptions = data.map(auditor => ({
            label: auditor.fullName,
            value: auditor._id,
          }));
          setAuditors(auditorOptions);
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (err) {
        setSubmissionError(err.message);
      }
    };

    fetchAuditors();
  }, [token]);

  useEffect(() => {
    if (selectedMeetingId && meetingData.length > 0) {
      setSelectedMeeting(selectedMeetingId);
    }
  }, [selectedMeetingId, meetingData]);

  useEffect(() => {
    dispatch(resetSlots());
  }, [selectedDate, dispatch]);

  useEffect(() => {
    if (!isPopupOpen) {
      setSelectedDate(null);
      setSelectedMeeting(null);
      setSavedSlots([]);
      setSubmissionError(null);
      dispatch(setSelectedAuditor(null));
      dispatch(resetSlots());
    }
  }, [isPopupOpen, dispatch]);

  const selectSlot = (currentState, setState, time) => {
    if (currentState === 'available') {
      if (time === '09:00-11:00' && slot2State === 'selected') {
        dispatch(setSlot2State('available'));
      } else if (time === '12:00-14:00' && slot1State === 'selected') {
        dispatch(setSlot1State('available'));
      }
      setState('selected');
    } else if (currentState === 'selected') {
      setState('available');
    }
  };

  const handleSaveSlot = () => {
    if (!selectedDate) {
      setSubmissionError('Please select a date.');
      return;
    }
    if (!isDayAllowed) {
      setSubmissionError('Please select a Monday, Tuesday, or Wednesday.');
      return;
    }
    const dayName = getDayName(selectedDate);
    const selectedSlotTime = timeSlots.find(slot => slot.state === 'selected')?.time;
    if (!selectedSlotTime) {
      setSubmissionError('Please select a slot for the chosen date.');
      return;
    }
    if (savedSlots.some(slot => slot.day === dayName)) {
      setSubmissionError(`A slot is already saved for ${dayName}. Please select a different day.`);
      return;
    }
    setSavedSlots(prev => [...prev, { day: dayName, time: selectedSlotTime }]);
    dispatch(resetSlots());
    setSelectedDate(null);
    setSubmissionError(null);
  };

  const handleRemoveSlot = (index) => {
    setSavedSlots(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMeeting) {
      setSubmissionError('Please select a meeting.');
      return;
    }
    if (!selectedAuditor) {
      setSubmissionError('Please select an auditor.');
      return;
    }
    if (savedSlots.length !== 3) {
      setSubmissionError('Please save exactly 3 slots (one for Monday, Tuesday, and Wednesday).');
      return;
    }
    if (!token) {
      setSubmissionError('Authentication token missing.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:7030/api/assign-auditor/${selectedMeeting}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          auditor_id: selectedAuditor,
          slots: savedSlots.map(slot => ({
            day: slot.day,
            time: slot.time,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to assign auditor: ${response.statusText}`);
      }

      const { success, data } = await response.json();
      if (success) {
        alert('Auditor and slots assigned successfully!');
        dispatch(fetchMeetings(token)); // Refresh meeting list
        dispatch(closePopup());
      } else {
        throw new Error('API returned unsuccessful response');
      }
    } catch (err) {
      setSubmissionError(err.message);
    }
  };

  const getDayName = (date) => {
    return date.toLocaleString('default', { weekday: 'long' });
  };

  if (!isPopupOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Assign Auditor and Slots</h2>
          <button
            onClick={() => dispatch(closePopup())}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side: Daily Schedule */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-base font-medium text-gray-900 mb-3">
                {selectedDate
                  ? `Schedule for ${getDayName(selectedDate)}, ${selectedDate.getDate()}-${selectedDate.toLocaleString('default', { month: 'short' })}-${selectedDate.getFullYear()}`
                  : 'Please Select a Date'}
              </h3>
              <div className="space-y-2">
                {timelineHours.map((hour, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 w-12">{hour}</span>
                    {isDayAllowed && timeSlots.find(slot => slot.startHour === hour) && (
                      <button
                        type="button"
                        className={`flex-1 px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                          timeSlots.find(slot => slot.startHour === hour).state === 'selected'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                        }`}
                        onClick={() => {
                          const slot = timeSlots.find(slot => slot.startHour === hour);
                          selectSlot(slot.state, slot.setState, slot.time);
                        }}
                      >
                        <span className="block font-medium">
                          {timeSlots.find(slot => slot.startHour === hour).state.charAt(0).toUpperCase() +
                            timeSlots.find(slot => slot.startHour === hour).state.slice(1)} Slot
                        </span>
                        <span className="text-xs">{timeSlots.find(slot => slot.startHour === hour).time}</span>
                      </button>
                    )}
                  </div>
                ))}
                {!isDayAllowed && selectedDate && (
                  <div className="bg-red-100 text-red-800 text-sm p-2 rounded-lg mt-2">
                    Please select a Monday, Tuesday, or Wednesday.
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Calendar, Meeting, and Auditor Selection */}
            <div className="space-y-4">
              <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-medium text-gray-900">
                    {selectedDate ? selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' }) : 'Select a Date'}
                  </h3>
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full disabled:opacity-50"
                      onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                      disabled={!selectedDate}
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full disabled:opacity-50"
                      onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                      disabled={!selectedDate}
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <Calendar
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.value)}
                  inline
                  className="w-full"
                  panelClassName="text-sm"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="meeting-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Meeting
                  </label>
                  <Dropdown
                    id="meeting-select"
                    value={selectedMeeting}
                    options={meetingData.map(meeting => ({
                      label: `Meeting ${meeting._id} (Project: ${meeting.project_name || 'N/A'})`,
                      value: meeting._id,
                    }))}
                    onChange={(e) => setSelectedMeeting(e.value)}
                    placeholder="Select a Meeting"
                    className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    panelClassName="text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="auditor-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Auditor
                  </label>
                  <Dropdown
                    id="auditor-select"
                    value={selectedAuditor}
                    options={auditors}
                    onChange={(e) => dispatch(setSelectedAuditor(e.value))}
                    placeholder="Select an Auditor"
                    className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    panelClassName="text-sm"
                  />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-900">Saved Slots ({savedSlots.length}/3)</span>
                  {isDayAllowed && (
                    <button
                      type="button"
                      onClick={handleSaveSlot}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Save Slot
                    </button>
                  )}
                </div>
                {savedSlots.length > 0 ? (
                  <div className="space-y-2">
                    {savedSlots.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                        <span className="text-sm text-gray-600">{`${slot.day}: ${slot.time}`}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSlot(index)}
                          className="text-red-600 hover:text-red-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full px-2 py-1"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">No slots saved yet.</span>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="space-y-4">
            {submissionError && (
              <div className="bg-red-100 text-red-800 text-sm p-2 rounded-lg text-center">
                {submissionError}
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => dispatch(closePopup())}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savedSlots.length !== 3}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors ${
                  savedSlots.length !== 3
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                }`}
              >
                Assign Slots
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeMeetingPopUp;