import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFunctions } from '../../../useFunctions';
import Button from './Button';

const EntrepreneurPreferenceSection = ({ user }) => {
  const navigate = useNavigate();
  const { getMyProjects, signOutDistroySession } = useFunctions();
  const { isAuthenticated, clientData } = useSelector((state) => state.clientAuth);
  const { token } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      if (!isAuthenticated || !token || !clientData) {
        setFetchError('Please log in to view your projects.');
        signOutDistroySession();
        navigate('/');
        return;
      }

      setLoading(true);
      try {
        const response = await getMyProjects();
        const projects = response.data.data || [];
        setProjects(projects);
        console.log(projects);
      } catch (err) {
        setFetchError(err.message || 'Failed to fetch project data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle edit navigation
  const handleEditProject = (project) => {
    navigate('/client-portal/entrepreneur/entreProjectData', { state: { project } });
  };

  if (!user?.role || user.role.toLowerCase() !== 'entrepreneur') {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">My Projects</h2>
      </div>

      {fetchError && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
          {fetchError}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-gray-500 italic">Loading projects...</div>
      ) : projects.length > 0 ? (
        <div
          className="space-y-6 max-h-[400px] overflow-y-auto pr-2"
          style={{ scrollbarWidth: 'thin' }}
        >
          {projects.map((project, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Project Name</p>
                    <p className="text-gray-800">{project.project_name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Industry</p>
                    <p className="text-gray-800">{project.project_industry || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Funding Goal</p>
                    <p className="text-gray-800">
                      {project.max_investment ? project.max_investment.toLocaleString() : '0'} EGP
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Pitch</p>
                    <p className="text-gray-800">{project.market_description || 'Not provided'}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditProject(project)}
                  className="flex items-center"
                >
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No projects found.</p>
      )}
    </div>
  );
};

export default EntrepreneurPreferenceSection;