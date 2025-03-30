import React, { useState, useEffect } from "react";
import { Eye, Plus } from "lucide-react"; // Ensure lucide-react is installed
import { useLocation } from "react-router-dom";

const EmployeeManageMeeting = () => {
  const [search, setSearch] = useState('');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectedInvestorResponses, setSelectedInvestorResponses] = useState([]);
  const [selectedEntrepreneurResponses, setSelectedEntrepreneurResponses] = useState([]);
  const location = useLocation();

  // Dummy data for tables
  const requestsData = [
    { id: 1, projectName: "IDEA-Venture", investor: "Taha Elrajel", entrepreneur: "+218 1235 54456", auditor: "Auditor", email: "example@gmail.com", status: "Done" },
    { id: 2, projectName: "Startup-X", investor: "John Doe", entrepreneur: "+218 9876 54321", auditor: "Auditor", email: "john@example.com", status: "Rejected" },
    { id: 3, projectName: "Tech-Innovate", investor: "Jane Smith", entrepreneur: "+218 1122 3344", auditor: "Auditor", email: "jane@example.com", status: "Pending" },
    { id: 4, projectName: "Green-Energy", investor: "Alice Brown", entrepreneur: "+218 5566 7788", auditor: "Auditor", email: "alice@example.com", status: "Scheduled" },
    { id: 5, projectName: "Green-Energy", investor: "Alice Brown", entrepreneur: "+218 5566 7788", auditor: "Auditor", email: "alice@example.com", status: "Scheduled" },
    { id: 6, projectName: "Green-Energy", investor: "Alice Brown", entrepreneur: "+218 5566 7788", auditor: "Auditor", email: "alice@example.com", status: "Scheduled" },
    { id: 7, projectName: "Green-Energy", investor: "Alice Brown", entrepreneur: "+218 5566 7788", auditor: "Auditor", email: "alice@example.com", status: "Scheduled" },
    { id: 8, projectName: "Green-Energy", investor: "Alice Brown", entrepreneur: "+218 5566 7788", auditor: "Auditor", email: "alice@example.com", status: "Scheduled" },
    { id: 9, projectName: "Green-Energy", investor: "Alice Brown", entrepreneur: "+218 5566 7788", auditor: "Auditor", email: "alice@example.com", status: "Scheduled" },
    { id: 10, projectName: "Green-Energy", investor: "Alice Brown", entrepreneur: "+218 5566 7788", auditor: "Auditor", email: "alice@example.com", status: "Scheduled" },
  ];

  const investorResponsesData = [
    { id: 1, projectName: "IDEA-Venture", investor: "Taha Elrajel", slots: "Mon, 18/9 2:00pm\nTues, 18/9 2:00pm" },
    { id: 2, projectName: "Startup-X", investor: "John Doe", slots: "Wed, 19/9 3:00pm\nThurs, 20/9 4:00pm" },
    { id: 3, projectName: "Tech-Innovate", investor: "Jane Smith", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 4, projectName: "Tech-Innovate", investor: "Jane Smith", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 5, projectName: "Tech-Innovate", investor: "Jane Smith", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 6, projectName: "Tech-Innovate", investor: "Jane Smith", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 7, projectName: "Tech-Innovate", investor: "Jane Smith", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 8, projectName: "Tech-Innovate", investor: "Jane Smith", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 9, projectName: "Tech-Innovate", investor: "Jane Smith", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 10, projectName: "Tech-Innovate", investor: "Jane Smith", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
  ];

  const entrepreneurResponsesData = [
    { id: 1, projectName: "IDEA-Venture", entrepreneur: "BOB", slots: "Mon, 18/9 2:00pm\nTues, 18/9 2:00pm" },
    { id: 2, projectName: "Startup-X", entrepreneur: "Alice", slots: "Wed, 19/9 3:00pm\nThurs, 20/9 4:00pm" },
    { id: 3, projectName: "Tech-Innovate", entrepreneur: "Charlie", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 4, projectName: "Tech-Innovate", entrepreneur: "Charlie", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 5, projectName: "Tech-Innovate", entrepreneur: "Charlie", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 6, projectName: "Tech-Innovate", entrepreneur: "Charlie", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 7, projectName: "Tech-Innovate", entrepreneur: "Charlie", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 8, projectName: "Tech-Innovate", entrepreneur: "Charlie", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 9, projectName: "Tech-Innovate", entrepreneur: "Charlie", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
    { id: 10, projectName: "Tech-Innovate", entrepreneur: "Charlie", slots: "Fri, 21/9 1:00pm\nSat, 22/9 11:00am" },
  ];

  useEffect(() => {
    if (location.pathname === '/employee-portal/manageMeeting') {
      // Fetch meeting requests logic can be added here
    }
  }, [location.pathname]);

  const handleRequestCheckbox = (id) => {
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((requestId) => requestId !== id) : [...prev, id]
    );
  };

  const handleSelectAllRequests = (e) => {
    setSelectedRequests(e.target.checked ? requestsData.map((request) => request.id) : []);
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

  // Filtered data based on search
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

  return (
    <div className="meeting-container">
      {/* Header Section */}
      <div className='meeting-header'>
        <input 
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button className="add-slots-btn">
          <Plus size={18} /> Add Slots
        </button>
      </div>
  
      {/* All Requests Table */}
      <div className="table-container">
        <h5>All Requests</h5>
        <div className="scrollable-table">
          <table className="meeting-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" checked={selectedRequests.length === requestsData.length} onChange={handleSelectAllRequests} />
                </th>
                <th>Id</th>
                <th>Project Name</th>
                <th>Investor</th>
                <th>Entrepreneur</th>
                <th>Auditor</th>
                <th>Data/Time</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <input type="checkbox" checked={selectedRequests.includes(request.id)} onChange={() => handleRequestCheckbox(request.id)} />
                  </td>
                  <td>#{request.id}</td>
                  <td className="highlight">{request.projectName}</td>
                  <td>{request.investor}</td>
                  <td>{request.entrepreneur}</td>
                  <td>{request.auditor}</td>
                  <td>{request.email}</td>
                  <td className={`status ${request.status.toLowerCase()}`}>{request.status}</td>
                  <td>
                    <button className="edit-btn"><Eye /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
      <div className="table-separetor"></div>

      {/* Responses Section */}
      <div className="responses-container">
        {/* Investor Response Table */}
        <div className="response-box">
          <div className="response-header">
            <h5>Investor Response</h5>
            <button className="check-btn">
              <Eye size={16} /> Check
            </button>
          </div>
          <div className="scrollable-table">
            <table className="meeting-table">
              <thead>
                <tr>
                  <th><input type="checkbox" checked={selectedInvestorResponses.length === investorResponsesData.length} onChange={handleSelectAllInvestor} /></th>
                  <th>Id</th>
                  <th>Project Name</th>
                  <th>Investor</th>
                  <th>Selected Slots</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvestorResponses.map((response) => (
                  <tr key={response.id}>
                    <td><input type="checkbox" checked={selectedInvestorResponses.includes(response.id)} onChange={() => handleInvestorCheckbox(response.id)} /></td>
                    <td>#{response.id}</td>
                    <td>{response.projectName}</td>
                    <td>{response.investor}</td>
                    <td>{response.slots}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-separetor"></div>
  
        {/* Entrepreneur Response Table */}
        <div className="response-box">
          <div className="response-header">
            <h5>Entrepreneur Response</h5>
            <button className="check-btn">
              <Eye size={16} /> Check
            </button>
          </div>
          <div className="scrollable-table">
            <table className="meeting-table">
              <thead>
                <tr>
                  <th><input type="checkbox" checked={selectedEntrepreneurResponses.length === entrepreneurResponsesData.length} onChange={handleSelectAllEntrepreneur} /></th>
                  <th>Id</th>
                  <th>Project Name</th>
                  <th>Entrepreneur</th>
                  <th>Selected Slots</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntrepreneurResponses.map((response) => (
                  <tr key={response.id}>
                    <td><input type="checkbox" checked={selectedEntrepreneurResponses.includes(response.id)} onChange={() => handleEntrepreneurCheckbox(response.id)} /></td>
                    <td>#{response.id}</td>
                    <td>{response.projectName}</td>
                    <td>{response.entrepreneur}</td>
                    <td>{response.slots}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManageMeeting;