import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMeetingData, setSelectedAuditor, setSlot1State, setSlot2State, resetSlots, openPopup, closePopup } from '../../redux/meetingDataSlice';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

function EmployeeMeetingPopUp() {
  const [selectedDate, setSelectedDate] = useState(null); // Single date selection
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [auditors, setAuditors] = useState([]); // List of auditors (dummy data)
  const [submissionError, setSubmissionError] = useState(null);
  const [savedSlots, setSavedSlots] = useState([]); // Track saved slots
  const dispatch = useDispatch();
  const { meetingData, selectedAuditor, slot1State, slot2State, isPopupOpen } = useSelector((state) => state.meetingData);

  // Timeline hours
  const timelineHours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

  // Clickable slots for the selected date
  const timeSlots = [
    { time: '09:00-11:00', state: slot1State, setState: (state) => dispatch(setSlot1State(state)), startHour: '09:00' },
    { time: '12:00-14:00', state: slot2State, setState: (state) => dispatch(setSlot2State(state)), startHour: '12:00' },
  ];

  // Allowed days: Monday (1), Tuesday (2), Wednesday (3) in JavaScript's getDay() (Sunday = 0)
  const allowedDaysOfWeek = [1, 2, 3];
  const isDayAllowed = selectedDate && allowedDaysOfWeek.includes(selectedDate.getDay());

  // Simulate fetching meetings with dummy data
  useEffect(() => {
    const dummyMeetings = [
      {
        _id: 'meeting1',
        project_id: { title: 'Project Alpha' },
        investor_id: { fullName: 'Investor 1' },
        entrepreneur_id: { fullName: 'Entrepreneur 1' },
        status: 'Requested',
      },
      {
        _id: 'meeting2',
        project_id: { title: 'Project Beta' },
        investor_id: { fullName: 'Investor 2' },
        entrepreneur_id: { fullName: 'Entrepreneur 2' },
        status: 'Requested',
      },
    ];

    dispatch(setMeetingData(dummyMeetings)); // Store dummy meetings in Redux
  }, [dispatch]);

  // Simulate fetching auditors with dummy data
  useEffect(() => {
    const dummyAuditors = [
      { _id: 'auditor1', fullName: 'Auditor One' },
      { _id: 'auditor2', fullName: 'Auditor Two' },
    ];

    const auditorOptions = dummyAuditors.map(auditor => ({
      label: auditor.fullName,
      value: auditor._id,
    }));
    setAuditors(auditorOptions);
  }, []);

  // Reset slot states when date changes
  useEffect(() => {
    dispatch(resetSlots());
  }, [selectedDate, dispatch]);

  // Cleanup when the popup closes
  useEffect(() => {
    if (!isPopupOpen) {
      // Reset form state when the popup closes
      setSelectedDate(null);
      setSelectedMeeting(null);
      setSavedSlots([]);
      setSubmissionError(null);
      dispatch(setSelectedAuditor(null)); // Reset selected auditor in Redux
      dispatch(resetSlots()); // Reset slots in Redux
    }
  }, [isPopupOpen, dispatch]);

  // Function to change state from available to selected
  const selectSlot = (currentState, setState, time) => {
    if (currentState === 'available') {
      // Deselect the other slot if it's selected
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

  // Save the selected slot for the current date
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

    // Check if a slot is already saved for this day
    if (savedSlots.some(slot => slot.day === dayName)) {
      setSubmissionError(`A slot is already saved for ${dayName}. Please select a different day.`);
      return;
    }

    // Save the slot
    setSavedSlots(prev => [...prev, { day: dayName, time: selectedSlotTime }]);
    dispatch(resetSlots()); // Reset for the next selection
    setSelectedDate(null); // Clear the date to prompt for the next day
    setSubmissionError(null);
  };

  // Remove a saved slot
  const handleRemoveSlot = (index) => {
    setSavedSlots(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission (simulate POST/PUT request with console.log)
  const handleSubmit = (e) => {
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

    // Simulate the API call by logging the data that would be sent
    const formData = {
      meetingId: selectedMeeting,
      auditor_id: selectedAuditor,
      slots: savedSlots,
    };

    console.log('Form Submission Data:', formData);

    // Simulate a successful response
    alert('Auditor and slots assigned successfully!');
    dispatch(closePopup()); // Close the popup using Redux
  };

  // Get the day name for a date
  const getDayName = (date) => {
    return date.toLocaleString('default', { weekday: 'long' });
  };

  // Conditionally render the popup based on isPopupOpen
  if (!isPopupOpen) return null;

  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <div className="meetingPopUpHeader">
          <h2>Assign Auditor and Slots</h2>
          <button className="closeButton" onClick={() => dispatch(closePopup())}>
            <span>X</span>
          </button>
        </div>
        <form className="meetingForm" onSubmit={handleSubmit}>
          <div className="meetingPopUpContainer">
            {/* Left Side: Daily Schedule */}
            <div className="scheduleSection">
              <h2>
                {selectedDate
                  ? `Schedule for ${getDayName(selectedDate)}, ${selectedDate.getDate()}-${selectedDate.toLocaleString('default', { month: 'short' })}-${selectedDate.getFullYear()}`
                  : 'Please Select a Date'}
              </h2>
              <div className="timeline">
                {timelineHours.map((hour, index) => (
                  <div className="time-line" key={index}>
                    <span>{hour}</span>
                    {isDayAllowed && timeSlots.find(slot => slot.startHour === hour) && (
                      <div
                        className={`time-slot ${timeSlots.find(slot => slot.startHour === hour).state}`}
                        onClick={() => {
                          const slot = timeSlots.find(slot => slot.startHour === hour);
                          selectSlot(slot.state, slot.setState, slot.time);
                        }}
                      >
                        <span>
                          {timeSlots.find(slot => slot.startHour === hour).state.charAt(0).toUpperCase() + timeSlots.find(slot => slot.startHour === hour).state.slice(1)} Slot<br />
                          {timeSlots.find(slot => slot.startHour === hour).time}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                {!isDayAllowed && selectedDate && (
                  <div className="errorMessage">
                    Please select a Monday, Tuesday, or Wednesday.
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Calendar, Meeting, and Auditor Selection */}
            <div className="calendarSection">
              <div className="calendarHeader">
                <h2>{selectedDate ? selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' }) : 'Select a Date'}</h2>
                <div>
                  <Button icon="pi pi-chevron-left" className="p-button-text p-button-sm" onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))} disabled={!selectedDate} />
                  <Button icon="pi pi-chevron-right" className="p-button-text p-button-sm" onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))} disabled={!selectedDate} />
                </div>
              </div>
              <Calendar
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.value)}
                inline
                style={{ width: '100%' }}
                panelStyle={{ fontSize: '14px' }}
              />
              <div className="auditorSectionDropdown">
                <div className="auditorSection">
                  <label>Select Meeting:</label>
                  <Dropdown
                    value={selectedMeeting}
                    options={meetingData.map(meeting => ({
                      label: `Meeting ${meeting._id} (Project: ${meeting.project_id?.title || 'N/A'})`,
                      value: meeting._id,
                    }))}
                    onChange={(e) => setSelectedMeeting(e.value)}
                    placeholder="Select a Meeting"
                    className="auditorDropdown"
                  />
                </div>
                <div className="auditorSection">
                  <label>Select Auditor:</label>
                  <Dropdown
                    value={selectedAuditor}
                    options={auditors}
                    onChange={(e) => dispatch(setSelectedAuditor(e.value))}
                    placeholder="Select an Auditor"
                    className="auditorDropdown"
                  />
                </div>
              </div>
              <div className="savedSlots">
                <span className="savedSlotsTitle">Saved Slots ({savedSlots.length}/3)</span>
                {isDayAllowed && (
                  <Button
                    label="Save Slot"
                    className="saveSlotButton"
                    onClick={handleSaveSlot}
                    type="button"
                  />
                )}
              </div>
              {savedSlots.length > 0 ? (
                <div className="savedSlotsList">
                  {savedSlots.map((slot, index) => (
                    <div key={index} className="savedSlotItem">
                      <span>{`${slot.day}: ${slot.time}`}</span>
                      <Button
                        label="Remove"
                        className="removeSlotButton"
                        onClick={() => handleRemoveSlot(index)}
                        type="button"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <span className="noSlotsMessage">No slots saved yet.</span>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="formActions">
            {submissionError && <div className="errorMessage">{submissionError}</div>}
            <div className="buttonGroup">
              <Button type="submit" label="Assign Slots" className="submitButton" disabled={savedSlots.length !== 3} />
              <Button type="button" label="Cancel" className="cancelButton" onClick={() => dispatch(closePopup())} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeMeetingPopUp;