import React, { useState } from "react";
import userImage from "../../assets/img-0.35.png";
import { PenSquare, Plus, Trash } from "lucide-react";

const dummyData = [
  { id: 1, name: "Taha Elrajel", username: "Taha_Elrajel123", phone: "+218 1235 54456", role: "Auditor", email: "Tahaelrajel@gmail.com", status: true, image: userImage },
  { id: 2, name: "Passant Essam", username: "Passant_essam123", phone: "+218 1235 54456", role: "Auditor", email: "Passant.essam@gmail.com", status: true, image: userImage },
  { id: 3, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 4, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 5, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 6, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 7, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 8, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 9, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 10, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 11, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 12, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 13, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 14, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 15, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 16, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 17, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 18, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 19, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
  { id: 20, name: "Lama", username: "Lama123", phone: "+218 1235 54456", role: "CS", email: "Lama@gmail.com", status: false, image: userImage },
];

function EmployeeManageStaff() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(dummyData);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleToggle = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: !user.status } : user));
  };

  const handleUserCheckbox = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allUserIds = filteredUsers.map(user => user.id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const filteredUsers = users.filter(user => {
    const searchTerm = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.phone.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm) ||
      user.username.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <>
      <div className="employee-header">
        <input 
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button className="add-btn"><Plus /> Add New Staff</button>
      </div>
      <table className="employee-table">
        <thead className="employee-table-head">
          <tr>
            <th>
              <input 
                type="checkbox" 
                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th>Id</th>
            <th></th>
            <th>Name</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Email</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleUserCheckbox(user.id)}
                />
              </td>
              <td>{user.id}#</td>
              <td>
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} 
                  />
              </td>
                    
              <td>
                  {user.name}
              </td>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>
                <div className="toggleStatusContainer">
                  <div className={`toggleStatus ${user.status ? "active" : ""}`} onClick={() => handleToggle(user.id)}>
                    <span className="toggleCircle"></span>
                    <span className="toggleText">{user.status ? "Inactive" : "Active"}</span>
                  </div>
                </div>
              </td>
              <td>
                <button className="edit-btn"><PenSquare /></button>
              </td>
              <td>
                <button className="delete-btn"><Trash /></button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default EmployeeManageStaff;