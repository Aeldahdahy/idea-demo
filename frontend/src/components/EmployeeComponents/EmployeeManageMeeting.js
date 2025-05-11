import React, { useState, useEffect } from 'react';
import { Eye, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openPopup, setSelectedMeetingId } from '../../redux/meetingDataSlice';
import MeetingTable from './Meeting/MeetingTables';
import EmployeeMeetingPopUp from './EmployeeMeetingPopUp';
import { useFunctions } from '../../useFunctions';

const EmployeeManageMeeting = () => {
  const {API_BASE_URL} = useFunctions();
  const [search, setSearch] = useState('');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectedInvestorResponses, setSelectedInvestorResponses] = useState([]);
  const [selectedEntrepreneurResponses, setSelectedEntrepreneurResponses] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [investorResponsesData, setInvestorResponsesData] = useState([]);
  const [entrepreneurResponsesData, setEntrepreneurResponsesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffect triggered: pathname=', location.pathname, 'token=', token);
    const fetchMeetings = async () => {
      console.log('fetchMeetings started');
      if (!token) {
        console.log('No token found, setting error');
        setError('You must be logged in to view meetings.');
        setLoading(false);
        console.log('State updated: loading=false, error=You must be logged in');
        return;
      }

      try {
        console.log('Initiating fetch with token:', token);
        setLoading(true);
        console.log('State updated: loading=true');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          console.log('Fetch timeout triggered');
          controller.abort();
        }, 10000);
        const response = await fetch(`${API_BASE_URL}/api/meetings`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        console.log('Fetch completed, response:', {
          status: response.status,
          ok: response.ok,
          headers: [...response.headers.entries()],
        });

        if (!response.ok) {
          console.log('Response not OK, status:', response.status);
          if (response.status === 401) {
            console.log('401 Unauthorized, setting session expired error');
            setError('Session expired. Please log in again.');
            setLoading(false);
            console.log('State updated: loading=false, error=Session expired');
          }
          throw new Error(`Failed to fetch meetings: ${response.statusText}`);
        }

        console.log('Parsing response JSON');
        const { success, data } = await response.json();
        console.log('Response JSON:', { success, data });

        if (!success) {
          console.log('API success=false, throwing error');
          throw new Error('API returned unsuccessful response');
        }

        console.time('transformData');
        console.log('Records received:', data.length);

        const transformedData = data.map((meeting) => {
          console.log('Transforming data for meeting:', meeting._id);
          console.log('Auditor ID present:', !!meeting.auditor_id);
          return {
            request: {
              id: meeting._id,
              projectName: meeting.project_name,
              investor: meeting.investor_name,
              entrepreneur: meeting.entrepreneur_name,
              auditor: meeting.auditor_name,
              email: meeting.investor_email,
              status: meeting.status,
            },
            investorResponse: {
              id: meeting._id,
              projectName: meeting.project_name,
              investor: meeting.investor_name,
              slots: meeting.investor_selected_slots.length > 0 ? meeting.investor_selected_slots.map(s => `${s.day} ${s.time}`).join('\n') : 'No slots selected',
            },
            entrepreneurResponse: {
              id: meeting._id,
              projectName: meeting.project_name,
              entrepreneur: meeting.entrepreneur_name,
              slots: meeting.available_slots.length > 0 ? meeting.available_slots.map(s => `${s.day} ${s.time}`).join('\n') : 'No slots selected',
            },
          };
        });

        const transformedRequests = transformedData.map((item) => item.request);
        const transformedInvestorResponses = transformedData.map((item) => item.investorResponse);
        const transformedEntrepreneurResponses = transformedData.map((item) => item.entrepreneurResponse);

        console.timeEnd('transformData');
        console.log('Updating state with transformed data');
        setRequestsData(transformedRequests);
        setInvestorResponsesData(transformedInvestorResponses);
        setEntrepreneurResponsesData(transformedEntrepreneurResponses);
        setLoading(false);
        console.log('State updated: loading=false, data lengths:', {
          requests: transformedRequests.length,
          investorResponses: transformedInvestorResponses.length,
          entrepreneurResponses: transformedEntrepreneurResponses.length,
        });
      } catch (err) {
        console.error('Fetch error caught:', err.message);
        setError(err.message);
        setLoading(false);
        console.log('State updated: loading=false, error=', err.message);
      }
    };

    if (location.pathname === '/employee-portal/manageMeetingRequest') {
      console.log('Calling fetchMeetings');
      fetchMeetings();
    }
  }, [location.pathname, token]);

  const handleRequestCheckbox = (id) => {
    console.log('handleRequestCheckbox: id=', id, 'current selectedRequests=', selectedRequests);
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((requestId) => requestId !== id) : [...prev, id]
    );
  };

  const handleInvestorCheckbox = (id) => {
    setSelectedInvestorResponses((prev) =>
      prev.includes(id) ? prev.filter((requestId) => requestId !== id) : [...prev, id]
    );
  };

  const handleSelectAllInvestor = (e) => {
    setSelectedInvestorResponses(e.target.checked ? investorResponsesData.map((response) => response.id) : []);
  };

  const handleEntrepreneurCheckbox = (id) => {
    setSelectedEntrepreneurResponses((prev) =>
      prev.includes(id) ? prev.filter((requestId) => requestId !== id) : [...prev, id]
    );
  };

  const handleSelectAllEntrepreneur = (e) => {
    setSelectedEntrepreneurResponses(e.target.checked ? entrepreneurResponsesData.map((response) => response.id) : []);
  };

  const handleAddSlots = () => {
    console.log('handleAddSlots called: selectedRequests=', selectedRequests);
    if (selectedRequests.length !== 1) {
      console.log('Validation failed: selectedRequests.length=', selectedRequests.length);
      alert('Please select exactly one meeting to assign slots.');
      return;
    }
    const selectedMeetingId = selectedRequests[0];
    console.log('Dispatching setSelectedMeetingId:', selectedMeetingId);
    dispatch(setSelectedMeetingId(selectedMeetingId));
    console.log('Dispatching openPopup');
    dispatch(openPopup());
  };

  const filteredRequests = requestsData.filter(
    (item) =>
      item.projectName.toLowerCase().includes(search.toLowerCase()) ||
      item.investor.toLowerCase().includes(search.toLowerCase()) ||
      item.entrepreneur.toLowerCase().includes(search.toLowerCase())
  );

  const filteredInvestorResponses = investorResponsesData.filter(
    (item) =>
      item.projectName.toLowerCase().includes(search.toLowerCase()) ||
      item.investor.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEntrepreneurResponses = entrepreneurResponsesData.filter(
    (item) =>
      item.projectName.toLowerCase().includes(search.toLowerCase()) ||
      item.entrepreneur.toLowerCase().includes(search.toLowerCase())
  );

  const requestColumns = [
    { title: 'Project Name', key: 'projectName' },
    { title: 'Investor', key: 'investor' },
    { title: 'Entrepreneur', key: 'entrepreneur' },
    { title: 'Auditor', key: 'auditor' },
    { title: 'Email', key: 'email' },
    {
      title: 'Status',
      key: 'status',
      render: (status) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === 'Completed'
              ? 'bg-green-100 text-green-800'
              : status === 'Requested'
              ? 'bg-yellow-100 text-yellow-800'
              : status === 'Rejected'
              ? 'bg-red-100 text-red-800'
              : status === 'Scheduled'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  const investorColumns = [
    { title: 'Project Name', key: 'projectName' },
    { title: 'Investor', key: 'investor' },
    {
      title: 'Selected Slots',
      key: 'slots',
      render: (slots) => slots.replace(/\n/g, ', '),
    },
  ];

  const entrepreneurColumns = [
    { title: 'Project Name', key: 'projectName' },
    { title: 'Entrepreneur', key: 'entrepreneur' },
    {
      title: 'Selected Slots',
      key: 'slots',
      render: (slots) => slots.replace(/\n/g, ', '),
    },
  ];

  const checkButton = (
    <button
      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
    >
      <Eye className="w-4 h-4 mr-1" />
      Check
    </button>
  );

  console.log('Rendering component, state:', {
    token: !!token,
    loading,
    error,
    requestsDataLength: requestsData.length,
    selectedRequests,
  });

  if (!token) {
    console.log('Rendering: No token, showing login message');
    return <div className="container mx-auto px-4 py-6">Please log in to view meetings.</div>;
  }

  if (loading) {
    console.log('Rendering: Loading state');
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('Rendering: Error state, error=', error);
    return <div className="container mx-auto px-4 py-6 text-red-600">Error: {error}</div>;
  }

  console.log('Rendering: Data state, showing tables');
  return (
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search meetings..."
          value={search}
          onChange={(e) => setSearch(e.value)}
          className="w-full sm:max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <button
          onClick={handleAddSlots}
          disabled={selectedRequests.length !== 1}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors ${
            selectedRequests.length !== 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Slots
        </button>
      </div>

      <div className="space-y-8">
        <MeetingTable
          title="All Requests"
          data={filteredRequests}
          columns={requestColumns}
          selectedItems={selectedRequests}
          handleCheckbox={handleRequestCheckbox}
        />
        <MeetingTable
          title="Investor Response"
          data={filteredInvestorResponses}
          columns={investorColumns}
          selectedItems={selectedInvestorResponses}
          handleCheckbox={handleInvestorCheckbox}
          handleSelectAll={handleSelectAllInvestor}
          hasSelectAll={true}
          actionButton={checkButton}
        />
        <MeetingTable
          title="Entrepreneur Response"
          data={filteredEntrepreneurResponses}
          columns={entrepreneurColumns}
          selectedItems={selectedEntrepreneurResponses}
          handleCheckbox={handleEntrepreneurCheckbox}
          handleSelectAll={handleSelectAllEntrepreneur}
          hasSelectAll={true}
          actionButton={checkButton}
        />
      </div>
      <EmployeeMeetingPopUp />
    </div>
  );
};

export default EmployeeManageMeeting;