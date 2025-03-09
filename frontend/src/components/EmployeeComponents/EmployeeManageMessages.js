import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useFunctions } from "../../useFunctions";
import { useLocation } from "react-router-dom";

function EmployeeManageMessages() {
  const [search, setSearch] = useState("");
  const [selectedMessages, setSelectedMessages] = useState([]);
  const { messages = [], users = [], loading, error, getAllMessages, getAllUsers, updateMessages } = useFunctions();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/employee-portal/manageMessages') {
      getAllMessages();
      getAllUsers();
    }
  }, [location.pathname, getAllMessages, getAllUsers]);

  const handleMessagesCheckbox = (id) => {
    setSelectedMessages((prev) =>
      prev.includes(id) ? prev.filter((messageId) => messageId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedMessages(e.target.checked ? messages.map((message) => message._id) : []);
  };

  const filteredMessages = Array.isArray(messages)
    ? messages.filter((message) => {
      const searchTerm = search.toLowerCase();
      return (
        message.fullname.toLowerCase().includes(searchTerm) ||
        message.email.toLowerCase().includes(searchTerm) ||
        (message.message?.toString() || "").includes(searchTerm)
      );
    })
    : [];

  const isExistingUser = (email) => {
    return users.some(user => user.email === email);
  };

  return (
    <>
      <div className="dashboard-container-header">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && !loading && <p style={{ color: "red" }}>{error}</p>}
      {filteredMessages.length === 0 ? (
        <p>No Messages found.</p>
      ) : (
        <table className="dashboard-table">
          <thead className="dashboard-table-head">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Existing User</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((message) => (
              <tr key={message._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedMessages.includes(message._id)}
                    onChange={() => handleMessagesCheckbox(message._id)}
                  />
                </td>
                <td>{message.fullname}</td>
                <td>{message.email}</td>
                <td>{message.message}</td>
                <td>{isExistingUser(message.email) ? "Yes" : "No"}</td>
                <td>
                  <div className="toggleStatusContainer" onClick={() => updateMessages(message._id, message.status)}>
                    <div className={`toggleStatus ${message.status === "Pending" ? "active" : ""}`}>
                      <span className="toggleCircle"></span>
                      <span className="toggleText">{message.status === "Pending" ? "Pending" : "Replied"}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <button className="edit-btn">
                    <Eye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default EmployeeManageMessages;