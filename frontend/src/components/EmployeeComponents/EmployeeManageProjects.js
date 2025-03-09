import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import defaultImage from "../../assets/img-0.36.png";
import { useFunctions } from "../../useFunctions";
import { useLocation } from "react-router-dom";

const EmployeeManageProject = () => {
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState([]);
  const { project = [], loading, error, updateProject, getAllProjects } = useFunctions();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/employee-portal/manageProject') {
      getAllProjects();
    }
  }, [location.pathname, getAllProjects]);

  const handleProjectCheckbox = (id) => {
    setSelectedProject((prev) =>
      prev.includes(id) ? prev.filter((projectId) => projectId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedProject(e.target.checked ? project.map((project) => project._id) : []);
  };

  const filteredProject = Array.isArray(project)
    ? project.filter((project) => {
      const searchTerm = search.toLowerCase();
      return (
        project.project_name.toLowerCase().includes(searchTerm) ||
        project.project_industry.toLowerCase().includes(searchTerm) ||
        project.city.toLowerCase().includes(searchTerm) ||
        project.state.toLowerCase().includes(searchTerm) ||
        project.status.toLowerCase().includes(searchTerm)
      );
    })
    : [];

  const handleUpdateProject = (id, updatedData) => {
    updateProject(id, updatedData);
  };


  return (
    <>
      <div className='dashboard-container-header'>
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
      {filteredProject.length === 0 ? (
        <p>No project found.</p>
      ) : (
        <table className="dashboard-table">
          <thead className='dashboard-table-head'>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={selectedProject.length === filteredProject.length && filteredProject.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th></th>
              <th>Project Name</th>
              <th>Industry Type</th>
              <th>City</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProject.map((project) => (
              <tr key={project._id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedProject.includes(project._id)}
                    onChange={() => handleProjectCheckbox(project._id)}
                  />
                </td>
                <td>
                    <img
                        src={project.project_images && project.project_images[0] ? `http://127.0.0.1:7030/${project.project_images[0]}` : defaultImage}
                        alt={project.project_name}
                        style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                    />
                </td>
                <td>{project.project_name || "N/A"}</td>
                <td>{project.project_industry || "N/A"}</td>
                <td>{project.city || "N/A"}</td>
                <td>{project.state || "N/A"}</td>
                <td>
                  <div className="toggleStatusContainer" onClick={() => handleUpdateProject(project._id, { status: project.status === "Approved" ? "Rejected" : "Approved" })}>
                    <div className={`toggleStatus ${project.status === "Approved" ? "" : "active"}`}>
                      <span className="toggleCircle"></span>
                      <span className="toggleText">{project.status === "Approved" ? "Approved" : "Rejected"}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <button className="edit-btn"><Eye /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
//   'Approved', 'Rejected'
};

export default EmployeeManageProject;