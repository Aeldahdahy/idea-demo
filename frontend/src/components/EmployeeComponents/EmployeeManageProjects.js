import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import defaultImage from "../../assets/img-0.36.png";
import { useFunctions } from "../../useFunctions";
import { useLocation } from "react-router-dom";
import { openProjectData } from '../../redux/projectDataSlice';
import { useDispatch } from "react-redux";

const EmployeeManageProject = () => {
  const [search, setSearch] = useState('');
  // const [selectedProject, setSelectedProject] = useState([]);
  const { project = [], loading, error, updateProject, getAllProjects, API_BASE_URL } = useFunctions();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/employee-portal/manageProject') {
      getAllProjects();
    }
  }, [location.pathname, getAllProjects]);

  // const handleProjectCheckbox = (id) => {
  //   setSelectedProject((prev) =>
  //     prev.includes(id) ? prev.filter((projectId) => projectId !== id) : [...prev, id]
  //   );
  // };

  // const handleSelectAll = (e) => {
  //   setSelectedProject(e.target.checked ? project.map((project) => project._id) : []);
  // };

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

  const handleOpenProjectPopup = (project) => {
    // console.log(project.additional_document);
    const transformedProjectData = {
      images: project.project_images.map(img => `${API_BASE_URL}/${img}`) || [], // Full URL for images
      details: {
        step1: {
          projectIndustry: project.project_industry || "N/A",
          projectStage: project.project_stage || "N/A", // Not in backend response
          minimumInvestment: project.min_investment || "N/A",
          maximumInvestment: project.max_investment || "N/A",
          netWorth: project.networth || "N/A", // Not in backend response
          dealType: project.deal_type || "N/A", // Not in backend response
          projectLocation: `${project.city || "N/A"}, ${project.state || "N/A"}`,
          website: project.website_link || "N/A", // Not in backend response
        },
        step2: {
          description: {
            marketDescription: project.market_description || "N/A",
            businessHighlights: project.bussiness_highlights || "N/A", // Not in backend response
            financialStatus: project.financial_status || "N/A", // Not in backend response
            businessObjectives: project.business_objectives || "N/A",
            businessDescription: project.business_description || "N/A", // Not in backend response
          },
        },
        step3: {
          documents: [
            ...(project.business_plan
              ? [{
                  name: "Business Plan",
                  size: "N/A",
                  color: "#00D0FF",
                  path: project.business_plan,
                }]
              : []),
            ...(project.additional_document
              ? [{
                  name: "Additional Document",
                  size: "N/A",
                  color: "#FFCA28",
                  path: project.additional_document,
                }]
              : []),
            ...(project.exective_sunnary
              ? [{
                name: "Exective Summary",
                size: "N/A",
                color: "#3A974C",
                path: project.exective_sunnary,
              }]
              : []),
            ...(project.financial_statement 
              ?[{
                name: "Financial Statement",
                size: "N/A",
                color: "#E71D36",
                path: project.financial_statement,
              }]
              :[]),
          ],
        },
        step4: {
          id: project._id,
          state: project.status,
          comment: project.comment || "N/A",
        },
        title: project.project_name || "N/A",
      },
    };
  
    dispatch(openProjectData({
      header: 'View Project',
      buttonText: 'View',
      type: 'View',
      initialData: transformedProjectData,
    }));
  };

  console.log("Filtered Projects:", filteredProject); // Debugging line

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
              {/* <th>
                <input 
                  type="checkbox" 
                  checked={selectedProject.length === filteredProject.length && filteredProject.length > 0}
                  onChange={handleSelectAll}
                />
              </th> */}
              <th>Logo</th>
              <th>Project Name</th>
              <th>Entrepreneur Name</th>
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
                {/* <td>
                  <input 
                    type="checkbox" 
                    checked={selectedProject.includes(project._id)}
                    onChange={() => handleProjectCheckbox(project._id)}
                  />
                </td> */}
                <td>
                  <img
                    src={project.project_images && project.project_images[0] ? `${API_BASE_URL}/${project.project_images[0]}` : defaultImage}
                    alt={project.project_name}
                    style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                  />
                </td>
                <td>{project.project_name || "N/A"}</td>
                <td>{project.user_name || "N/A"}</td>
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
                  {/* Pass the full project object instead of just the ID */}
                  <button className="edit-btn" onClick={() => handleOpenProjectPopup(project)}>
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
};

export default EmployeeManageProject;