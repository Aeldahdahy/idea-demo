import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../Common/Card";
import { useFunctions } from "../../../useFunctions";

function ClientInvestorHome() {
  const navigate = useNavigate();
  const clientRole = useSelector((state) => state.clientAuth.clientData?.clientRole);
  const firstLogin = useSelector((state) => state.clientAuth.clientData?.firstLogin);
  const { project = [], loading, error, getAllProjects } = useFunctions();
  
  // State for filters
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Redirect to investorPreferences if firstLogin is true
  useEffect(() => {
    if (clientRole === 'Investor' && firstLogin === true) {
      navigate('/client-portal/investor/investorPreferences', { replace: true });
    }
  }, [clientRole, firstLogin, navigate]);

  // Fetch projects on mount
  useEffect(() => {
    getAllProjects().catch((err) => {
      toast.error(`Failed to load projects: ${err.message}`);
    });
  }, []);

  // Handle retry on error
  const handleRetry = () => {
    getAllProjects().catch((err) => {
      toast.error(`Failed to load projects: ${err.message}`);
    });
  };

  // Get unique industries from projects
  const industries = ["all", ...new Set(project.map(p => p?.industry || "Other"))];

  // Filter and sort projects
  const filteredProjects = project
    .filter(p => selectedIndustry === "all" || p?.industry === selectedIndustry)
    .filter(p => !searchQuery || (p?.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);
      if (sortBy === "oldest") return new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0);
      if (sortBy === "name") return (a?.title || "").localeCompare(b?.title || "");
      return 0;
    });

  // Group projects by industry
  const projectsByIndustry = filteredProjects.reduce((acc, project) => {
    const industry = project?.industry || "Other";
    if (!acc[industry]) acc[industry] = [];
    acc[industry].push(project);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Investment Opportunities</h1>
              <p className="mt-2 text-lg text-gray-600">Discover and invest in promising projects</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 ${isFilterOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 pointer-events-none'}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry.charAt(0).toUpperCase() + industry.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedIndustry("all");
                  setSortBy("newest");
                  setSearchQuery("");
                }}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16 bg-red-50 rounded-xl">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="mt-4 text-lg font-medium text-red-800">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Projects State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-900">No projects found</p>
            <p className="mt-2 text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="space-y-12">
            {Object.entries(projectsByIndustry).map(([industry, projects]) => (
              <div key={industry} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
                <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {industry} Projects
                    <span className="ml-3 text-sm font-normal text-gray-500">
                      ({projects.length} {projects.length === 1 ? 'project' : 'projects'})
                    </span>
                  </h2>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {projects.map((project) => (
                      <div 
                        key={project._id} 
                        className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <Card project={project} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientInvestorHome; 