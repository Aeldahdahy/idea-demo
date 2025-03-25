import React, { useState, useEffect } from "react";
import { Eye, Plus } from "lucide-react"; // Ensure lucide-react is installed
import { useLocation } from "react-router-dom";

const EmployeeManageMeeting = () => {
  const [search, setSearch] = useState('');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectedInvestorResponses, setSelectedInvestorResponses] = useState([]);
  const [selectedEntrepreneurResponses, setSelectedEntrepreneurResponses] = useState([]);
  const location = useLocation();

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
    setSelectedRequests(e.target.checked ? [1, 2, 3, 4] : []);
  };

  const handleInvestorCheckbox = (id) => {
    setSelectedInvestorResponses((prev) =>
      prev.includes(id) ? prev.filter((requestId) => requestId !== id) : [...prev, id]
    );
  };

  const handleSelectAllInvestor = (e) => {
    setSelectedInvestorResponses(e.target.checked ? [1, 2, 3] : []);
  };

  const handleEntrepreneurCheckbox = (id) => {
    setSelectedEntrepreneurResponses((prev) =>
      prev.includes(id) ? prev.filter((requestId) => requestId !== id) : [...prev, id]
    );
  };

  const handleSelectAllEntrepreneur = (e) => {
    setSelectedEntrepreneurResponses(e.target.checked ? [1, 2, 3] : []);
  };

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
        <table className="meeting-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={selectedRequests.length === 4} onChange={handleSelectAllRequests} />
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
            {[1, 2, 3, 4].map((id) => (
              <tr key={id}>
                <td>
                  <input type="checkbox" checked={selectedRequests.includes(id)} onChange={() => handleRequestCheckbox(id)} />
                </td>
                <td>#{id}</td>
                <td className="highlight">IDEA-Venture</td>
                <td>Taha Elrajel</td>
                <td>+218 1235 54456</td>
                <td>Auditor</td>
                <td>example@gmail.com</td>
                <td className={`status ${id === 1 ? "done" : id === 2 ? "rejected" : id === 3 ? "pending" : "scheduled"}`}>
                  {id === 1 ? "Done" : id === 2 ? "Rejected" : id === 3 ? "Pending" : "Scheduled"}
                </td>
                <td>
                  <button className="edit-btn"><Eye /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
          <table className="meeting-table">
            <thead>
              <tr>
                <th><input type="checkbox" checked={selectedInvestorResponses.length === 3} onChange={handleSelectAllInvestor} /></th>
                <th>Id</th>
                <th>Project Name</th>
                <th>Investor</th>
                <th>Selected Slots</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((id) => (
                <tr key={id}>
                  <td><input type="checkbox" checked={selectedInvestorResponses.includes(id)} onChange={() => handleInvestorCheckbox(id)} /></td>
                  <td>#{id}</td>
                  <td>IDEA-Venture</td>
                  <td>Taha Elrajel</td>
                  <td>Mon, 18/9 2:00pm<br />Tues, 18/9 2:00pm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Entrepreneur Response Table */}
        <div className="response-box">
          <div className="response-header">
            <h5>Entrepreneur Response</h5>
            <button className="check-btn">
              <Eye size={16} /> Check
            </button>
          </div>
          <table className="meeting-table">
            <thead>
              <tr>
                <th><input type="checkbox" checked={selectedEntrepreneurResponses.length === 3} onChange={handleSelectAllEntrepreneur} /></th>
                <th>Id</th>
                <th>Project Name</th>
                <th>Entrepreneur</th>
                <th>Selected Slots</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((id) => (
                <tr key={id}>
                  <td><input type="checkbox" checked={selectedEntrepreneurResponses.includes(id)} onChange={() => handleEntrepreneurCheckbox(id)} /></td>
                  <td>#{id}</td>
                  <td>IDEA-Venture</td>
                  <td>BOB</td>
                  <td>Mon, 18/9 2:00pm<br />Tues, 18/9 2:00pm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManageMeeting;