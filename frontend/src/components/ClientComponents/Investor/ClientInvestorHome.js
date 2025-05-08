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
  const [isFilterOpen, setIsFilterOpen] = useState(true); // Open by default

  // Redirect to investorPreferences if firstLogin is true
  useEffect(() => {
    if (clientRole === "Investor" && firstLogin === true) {
      navigate("/client-portal/investor/investorPreferences", { replace: true });
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
  const industries = ["all", ...new Set(project.map((p) => p?.project_industry || "Other"))];

  // Filter and sort projects
  const filteredProjects = project
    .filter((p) => selectedIndustry === "all" || p?.project_industry === selectedIndustry)
    .filter((p) =>
      !searchQuery || (p?.project_name?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);
      if (sortBy === "oldest") return new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0);
      if (sortBy === "name") return (a?.project_name || "").localeCompare(b?.project_name || "");
      return 0;
    });

  // Group projects by industry
  const projectsByIndustry = filteredProjects.reduce((acc, project) => {
    const industry = project?.project_industry || "Other";
    if (!acc[industry]) acc[industry] = [];
    acc[industry].push(project);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Explore Investment Opportunities
              </h1>
              <p className="mt-4 text-lg md:text-xl text-blue-200">
                Discover groundbreaking projects from visionary entrepreneurs
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex space-x-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-expanded={isFilterOpen}
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        {isFilterOpen && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search projects"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      aria-label="Clear search"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Industry Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-gray-900"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  aria-label="Select industry"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-gray-900"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort projects"
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
                  className="w-full px-4 py-3 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium"
                  aria-label="Reset filters"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State with Skeleton */}
        {loading && (
          <div className="space-y-12">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[...Array(4)].map((_, cardIndex) => (
                    <div key={cardIndex} className="bg-gray-100 rounded-lg p-6 animate-pulse">
                      <div className="h-48 w-full bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16 bg-red-50 rounded-2xl shadow-lg">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="mt-4 text-lg font-medium text-red-800">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label="Retry loading projects"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Projects State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-2xl shadow-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-900">No projects found</p>
            <p className="mt-2 text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="space-y-12">
            {Object.entries(projectsByIndustry).map(([industry, projects]) => (
              <div key={industry} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-blue-900">
                    {industry} Projects
                    <span className="ml-3 text-sm font-normal text-gray-600">
                      ({projects.length} {projects.length === 1 ? "project" : "projects"})
                    </span>
                  </h2>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {projects.map((project) => (
                      <div
                        key={project._id}
                        className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-lg"
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

        {/* Sticky Filter Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:hidden"
          aria-label={isFilterOpen ? "Hide filters" : "Show filters"}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ClientInvestorHome;