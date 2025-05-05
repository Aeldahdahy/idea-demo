import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useFunctions } from "../../useFunctions";
import { useLocation } from "react-router-dom";

function EmployeeManageMessages() {
  const [search, setSearch] = useState("");
  const { messages = [], users = [], loading, error, getAllMessages, getAllUsers, updateMessages } = useFunctions();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/employee-portal/manageMessages') {
      getAllMessages();
      getAllUsers();
    }
  }, [location.pathname, getAllMessages, getAllUsers]);

  const filteredMessages = Array.isArray(messages)
    ? messages.filter((message) => {
        const searchTerm = search.toLowerCase();
        return (
          message.fullname.toLowerCase().includes(searchTerm) ||
          message.email.toLowerCase().includes(searchTerm) ||
          (message.message?.toLowerCase() || "").includes(searchTerm)
        );
      })
    : [];

  const isExistingUser = (email) => {
    return users.some(user => user.email === email);
  };

  return (
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>
      {loading && (
        <div className="flex justify-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      {error && !loading && (
        <div className="text-red-600 bg-red-100 p-4 rounded-lg">{error}</div>
      )}
      {filteredMessages.length === 0 && !loading && !error ? (
        <div className="text-gray-600 text-center py-4">No messages found.</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg max-h-[500px] overflow-auto sm:overflow-x-hidden">
          <table className="min-w-[800px] w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Existing User</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <tr key={message._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {message.fullname || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {message.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {message.message || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {isExistingUser(message.email) ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div
                      className="inline-flex items-center cursor-pointer"
                      onClick={() => updateMessages(message._id, message.status === "Pending" ? "Replied" : "Pending")}
                      role="switch"
                      aria-checked={message.status === "Replied"}
                    >
                      <div
                        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out ${
                          message.status === "Replied" ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute left-0 inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
                            message.status === "Replied" ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{message.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeManageMessages;