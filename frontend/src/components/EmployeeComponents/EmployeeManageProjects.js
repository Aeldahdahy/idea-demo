import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import defaultImage from "../../assets/img-0.36.png";
import { useFunctions } from "../../useFunctions";
import { useLocation } from "react-router-dom";
import { openProjectData } from '../../redux/projectDataSlice';
import { useDispatch } from "react-redux";

const EmployeeManageProject = () => {
  const [search, setSearch] = useState('');
  const { project = [], loading, error, updateProject, getAllProjects, API_BASE_URL } = useFunctions();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/employee-portal/manageProject') {
      getAllProjects();
    }
  }, [location.pathname, getAllProjects]);

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
    const transformedProjectData = {
      images: project.project_images.map(img => `${API_BASE_URL}/${img}`) || [],
      details: {
        step1: {
          projectIndustry: project.project_industry || "N/A",
          projectStage: project.project_stage || "N/A",
          minimumInvestment: project.min_investment || "N/A",
          maximumInvestment: project.max_investment || "N/A",
          netWorth: project.networth || "N/A",
          dealType: project.deal_type || "N/A",
          projectLocation: `${project.city || "N/A"}, ${project.state || "N/A"}`,
          website: project.website_link || "N/A",
        },
        step2: {
          description: {
            marketDescription: project.market_description || "N/A",
            businessHighlights: project.bussiness_highlights || "N/A",
            financialStatus: project.financial_status || "N/A",
            businessObjectives: project.business_objectives || "N/A",
            businessDescription: project.business_description || "N/A",
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
              : []),
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

  return (
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      <div className="mb-6">
        <input 
          type="text"
          placeholder="Search projects..."
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
      {filteredProject.length === 0 && !loading && !error ? (
        <div className="text-gray-600 text-center py-4">No projects found.</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg max-h-[500px] overflow-auto sm:overflow-x-hidden">
          <table className="min-w-[800px] w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrepreneur Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProject.map((project) => (
                <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={project.project_images && project.project_images[0] ? `${API_BASE_URL}/${project.project_images[0]}` : defaultImage}
                      alt={project.project_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.project_name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.user_name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.project_industry || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.city || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.state || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div
                      className="inline-flex items-center cursor-pointer"
                      onClick={() => handleUpdateProject(project._id, { status: project.status === "Approved" ? "Rejected" : "Approved" })}
                      role="switch"
                      aria-checked={project.status === "Approved"}
                    >
                      <div
                        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out ${
                          project.status === "Approved" ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute left-0 inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
                            project.status === "Approved" ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{project.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleOpenProjectPopup(project)}
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
};

export default EmployeeManageProject;