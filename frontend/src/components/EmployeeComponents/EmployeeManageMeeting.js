import React, { useState, useEffect } from "react";
import { Eye, Plus } from "lucide-react";
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
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search meetings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Slots
        </button>
      </div>

      <div className="space-y-8">
        {/* All Requests Table */}
        <div>
          <h5 className="text-lg font-semibold text-gray-900 mb-4">All Requests</h5>
          <div className="bg-white shadow-md rounded-lg max-h-[300px] overflow-auto sm:overflow-x-hidden">
            <table className="min-w-[800px] w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrepreneur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auditor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedRequests.includes(request.id)}
                        onChange={() => handleRequestCheckbox(request.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.projectName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.investor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.entrepreneur}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.auditor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === "Done"
                            ? "bg-green-100 text-green-800"
                            : request.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : request.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investor Response Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-gray-900">Investor Response</h5>
            <button
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Eye className="w-4 h-4 mr-1" />
              Check
            </button>
          </div>
          <div className="bg-white shadow-md rounded-lg max-h-[300px] overflow-auto sm:overflow-x-hidden">
            <table className="min-w-[800px] w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selected Slots</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvestorResponses.map((response) => (
                  <tr key={response.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedInvestorResponses.includes(response.id)}
                        onChange={() => handleInvestorCheckbox(response.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{response.projectName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{response.investor}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{response.slots.replace(/\n/g, ", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Entrepreneur Response Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-gray-900">Entrepreneur Response</h5>
            <button
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Eye className="w-4 h-4 mr-1" />
              Check
            </button>
          </div>
          <div className="bg-white shadow-md rounded-lg max-h-[300px] overflow-auto sm:overflow-x-hidden">
            <table className="min-w-[800px] w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrepreneur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selected Slots</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEntrepreneurResponses.map((response) => (
                  <tr key={response.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedEntrepreneurResponses.includes(response.id)}
                        onChange={() => handleEntrepreneurCheckbox(response.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{response.projectName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{response.entrepreneur}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{response.slots.replace(/\n/g, ", ")}</td>
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