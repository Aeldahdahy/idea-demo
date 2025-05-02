import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFunctions } from '../../../useFunctions';
import Card from '../../Common/Card';

function ClientEntreMyProjects() {
  const navigate = useNavigate();
  const { getMyProjects, API_BASE_URL, loading, error, signOutDistroySession } = useFunctions();
  const [projects, setProjects] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  // Get auth state from Redux
  const { isAuthenticated, clientData } = useSelector((state) => state.clientAuth);
  const { token } = useSelector((state) => state.auth);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      if (!isAuthenticated || !token || !clientData) {
        setFetchError('Please log in to view your projects.');
        signOutDistroySession();
        navigate('/');
        return;
      }

      try {
        const response = await getMyProjects();
        setProjects(response.data.data || []);
      } catch (err) {
        setFetchError(err.message || 'Failed to fetch projects. Please try again.');
      }
    };

    fetchProjects();
  }, [isAuthenticated, token, clientData, navigate]);

  const handleAddPitch = () => {
    navigate('/client-portal/entrepreneur/entreProjectData');
  };

  const AddNewPitchCard = () => (
    <motion.div
      className="w-full bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <button
        onClick={handleAddPitch}
        className="w-full h-full p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition"
      >
        <div className="relative h-48 w-full bg-gray-100 rounded-t-lg flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
            +
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Add New Pitch
          </h2>
          <p className="text-gray-600 text-sm">
            Create a new project to share with investors
          </p>
          <div className="mt-4">
            <div className="w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg">
              CREATE PROJECT
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );

  // Calculate the total number of items (projects + add card)
  const totalItems = loading ? 3 : projects.length + 1;

  // Determine the grid columns based on item count
  const getGridColumns = () => {
    if (totalItems === 1) return 'grid-cols-1 max-w-sm mx-auto';
    if (totalItems === 2) return 'grid-cols-1 sm:grid-cols-2';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          My Projects
        </h1>

        {(error || fetchError) && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            {error || fetchError}
            <button
              onClick={() => window.location.reload()}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}
        <div style={{ display:'flex', justifyContent:"center"}}>
        <div className={`grid ${getGridColumns()} gap-10`} style={{width: "62%"}}>
          {loading ? (
            [...Array(3)].map((_, index) => (
              <Card key={index} project={{ isPlaceholder: true }} baseUrl={API_BASE_URL} />
            ))
          ) : (
            <>
              {projects.map((project) => (
                <Card
                  key={project._id}
                  project={project}
                  baseUrl={API_BASE_URL}
                />
              ))}
              <AddNewPitchCard />
            </>
          )}
        </div>
        </div>
        {!loading && projects.length === 0 && (
          <div className="text-center text-gray-600 mt-6">
            <p>No projects found. Start by adding a new pitch!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientEntreMyProjects;