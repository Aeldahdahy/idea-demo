import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MapPin, Calendar, Briefcase, DollarSign, ChevronLeft, Share2, ChevronRight, Send, Star, StarOff, Heart, Linkedin, X } from 'lucide-react';
import { decryptId } from '../../../Security/encryptionUtils';

const ClientInvestorViewProject = () => {
  const { projectId: encryptedProjectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [meetingId, setMeetingId] = useState(null);
  const [isInterested, setIsInterested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);
  const lastFetchedProjectId = useRef(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:7030';

  let projectId;
  try {
    projectId = decryptId(encryptedProjectId);
  } catch (err) {
    console.error('Failed to decrypt project ID:', err);
    projectId = null;
  }

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!projectId) {
      toast.error('Invalid project ID. The ID may not be properly encrypted.');
      return;
    }

    if (lastFetchedProjectId.current === projectId && projectData) {
      return;
    }

    const fetchProjectAndMeetingStatus = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found. Please log in again.');
        }

        const projectResponse = await axios.get(`${API_BASE_URL}/api/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (projectResponse.data.data && mountedRef.current) {
          setProjectData(projectResponse.data.data);
          lastFetchedProjectId.current = projectId;

          const clientData = JSON.parse(localStorage.getItem('clientData'));
          if (!clientData || !clientData._id) {
            throw new Error('Investor ID not found. Please log in again.');
          }
          const investorId = clientData._id;

          const meetingResponse = await axios.get(
            `${API_BASE_URL}/api/meeting/status/${projectId}/${investorId}/${projectResponse.data.data.user_id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (meetingResponse.data.exists && meetingResponse.data.status !== 'Cancelled' && meetingResponse.data.status !== 'Completed') {
            setIsShortlisted(true);
            setMeetingId(meetingResponse.data.meetingId);
          }
        }
        setError(null);
      } catch (err) {
        if (err.response?.status === 403) {
          setError('Access forbidden. Please log in again or contact support.');
          toast.error('Access forbidden. Please log in again.');
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to load project data');
          toast.error(err.response?.data?.message || err.message || 'Failed to load project data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndMeetingStatus();
  }, [projectId, API_BASE_URL]);

  useEffect(() => {
    if (projectData?.project_images?.length > 0) {
      const interval = setInterval(() => {
        if (mountedRef.current) {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % projectData.project_images.length);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [projectData?.project_images?.length]);

  const handleRequestMeeting = async () => {
    if (isShortlisted) {
      toast.info('Meeting already requested');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const clientData = JSON.parse(localStorage.getItem('clientData'));
      if (!clientData || !clientData._id) {
        throw new Error('Investor ID not found. Please log in again.');
      }
      const investorId = clientData._id;

      if (!projectData?.user_id) {
        throw new Error('Entrepreneur ID is missing for this project.');
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/meetings`,
        { project_id: projectId, investor_id: investorId, entrepreneur_id: projectData.user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.data) {
        setIsShortlisted(true);
        setMeetingId(response.data.data._id);
        toast.success('Meeting request created successfully');
      }
      setError(null);
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error('Access forbidden. Please log in again.');
        setError('Access forbidden. Please log in again or contact support.');
      } else if (err.response?.status === 404) {
        toast.error('Invalid project or user ID. Please contact support.');
        setError('Invalid project or user ID.');
      } else {
        toast.error(err.response?.data?.message || 'Failed to create meeting request');
        setError(err.response?.data?.message || 'Failed to create meeting');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelMeeting = async () => {
    if (!isShortlisted || !meetingId) {
      toast.info('No meeting to cancel');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      await axios.delete(`${API_BASE_URL}/api/cancel-meeting/${meetingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsShortlisted(false);
      setMeetingId(null);
      toast.success('Meeting canceled successfully');
      setError(null);
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error('Not authorized to cancel this meeting.');
        setError('Not authorized to cancel this meeting.');
      } else if (err.response?.status === 404) {
        toast.error('Meeting not found.');
        setError('Meeting not found.');
      } else {
        toast.error(err.response?.data?.message || 'Failed to cancel meeting');
        setError(err.response?.data?.message || 'Failed to cancel meeting');
      }
    } finally {
      setLoading(false);
    }
  };

  const defaultImage = "https://images.pexels.com/photos/3290068/pexels-photo-3290068.jpeg";
  const images = projectData?.project_images?.length
    ? projectData.project_images.map((img) => `${API_BASE_URL}/${img}`)
    : [defaultImage];
  const displayImages = images;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + displayImages.length) % displayImages.length);
  };

  if (!projectId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600">Invalid Project ID</h2>
          <p className="text-gray-600 mt-2">
            The project ID may not be properly encrypted or the encryption key is incorrect.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600 mt-2">{error || 'Failed to load project data.'}</p>
          {error?.includes('log in') && (
            <button
              onClick={() => window.location.href = '/login'}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    );
  }

  const projectStats = [
    { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: `${projectData.city || 'N/A'}, ${projectData.state || 'N/A'}` },
    { icon: <Calendar className="w-5 h-5" />, label: 'Stage', value: projectData.project_stage || 'N/A' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Industry', value: projectData.project_industry || 'N/A' },
    { icon: '', label: 'Investment', value: `EGP ${projectData.min_investment || 'N/A'} - EGP ${projectData.max_investment || 'N/A'}` },
  ];

  const investmentData = [
    { label: 'Min Investment', value: projectData.min_investment ? `EGP ${projectData.min_investment}` : 'N/A', color: 'bg-blue-50' },
    { label: 'Max Investment', value: projectData.max_investment ? `EGP ${projectData.max_investment}` : 'N/A', color: 'bg-indigo-50' },
    { label: 'Net Worth', value: projectData.networth ? `EGP ${projectData.networth}` : 'N/A', color: 'bg-purple-50' },
    {
      label: 'Deal Type',
      value: Array.isArray(projectData.deal_type)
        ? projectData.deal_type.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')
        : projectData.deal_type || 'N/A',
      color: 'bg-green-50'
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'business', label: 'Business' },
    { id: 'market', label: 'Market' },
    { id: 'financial', label: 'Financial' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Project Overview</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {projectData.business_objectives || 'No overview available.'}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Highlights</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {projectData.bussiness_highlights ? (
                  projectData.bussiness_highlights
                    .split('\n')
                    .filter((item) => item.trim() !== '')
                    .map((highlight, index) => (
                      <li key={index} className="leading-relaxed">{highlight}</li>
                    ))
                ) : (
                  <li>No highlights available.</li>
                )}
              </ul>
            </div>
          </div>
        );
      case 'business':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Business Objectives</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {projectData.business_objectives || 'No business objectives available.'}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Team Overview</h3>
              <p className="text-gray-700 leading-relaxed">
                {projectData.team_overview || 'No team overview available.'}
              </p>
            </div>
          </div>
        );
      case 'market':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-3">Market Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {projectData.market_description || 'No market description available.'}
            </p>
          </div>
        );
      case 'financial':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Financial Status</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {projectData.financial_status || 'No financial status available.'}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Investment Details</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Min Investment</p>
                  <p className="text-lg font-semibold">EGP{projectData.min_investment || 'N/A'}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Max Investment</p>
                  <p className="text-lg font-semibold">EGP{projectData.max_investment || 'N/A'}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Net Worth</p>
                  <p className="text-lg font-semibold">EGP{projectData.networth || 'N/A'}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Deal Type</p>
                  <p className="text-lg font-semibold capitalize">
                    {Array.isArray(projectData.deal_type)
                      ? projectData.deal_type.join(', ')
                      : projectData.deal_type || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>No content available.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center mb-4">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mx-auto">{projectData.project_name || 'N/A'}</h1>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-md mr-4 flex-shrink-0">
              <img
                src={projectData.project_logo ? `${API_BASE_URL}/${projectData.project_logo}` : defaultImage}
                alt={`${projectData.project_name} logo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">{projectData.project_name || 'N/A'}</h2>
              <p className="text-white/80 flex items-center mt-1">
                <span>{`${projectData.city || 'N/A'}, ${projectData.state || 'N/A'}`}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative bg-white rounded-xl overflow-hidden shadow-sm group">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  {displayImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Project image ${index + 1}`}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute'
                      }`}
                      onLoad={() => setIsImageLoading(false)}
                      onError={(e) => {
                        e.target.src = defaultImage;
                        setIsImageLoading(false);
                      }}
                    />
                  ))}
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>
                {displayImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 transition-colors p-2 rounded-full text-white opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 transition-colors p-2 rounded-full text-white opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                      {displayImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="flex border-b">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-4 px-4 text-sm sm:text-base font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="p-6">{renderTabContent()}</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4">Project Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  {projectStats.map((stat, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex items-center text-gray-600 mb-1">
                        {stat.icon}
                        <span className="ml-2 text-sm">{stat.label}</span>
                      </div>
                      <span className="font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Investment</h3>
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {projectData.project_stage || 'N/A'} Stage
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {investmentData.map((item, index) => (
                    <div
                      key={index}
                      className={`${item.color} rounded-lg p-3 transition-transform hover:scale-105`}
                    >
                      <p className="text-xs text-gray-600 mb-1">{item.label}</p>
                      <p className="text-sm font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-700 text-sm">
                    {/* <DollarSign className="w-5 h-5 mr-1" /> */}
                    <span>
                      <span className="font-medium">Deal Type:</span>{' '}
                      {Array.isArray(projectData.deal_type)
                        ? projectData.deal_type.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')
                        : projectData.deal_type || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {projectData.team_members && projectData.team_members.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4">Team</h3>
                  <div className="space-y-4">
                    {projectData.team_members.map((member) => (
                      <div key={member._id} className="flex items-start space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={member.member_image ? `${API_BASE_URL}/${member.member_image}` : defaultImage}
                            alt={member.member_name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = defaultImage;
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{member.member_name}</h4>
                            {member.linkedin_account && (
                              <a
                                href={member.linkedin_account}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                <Linkedin className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{member.member_position}</p>
                          {member.member_bio && (
                            <p className="text-sm text-gray-700 mt-1 line-clamp-2">{member.member_bio}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm p-6">
                <button
                  onClick={() => setIsInterested(!isInterested)}
                  className={`w-full mb-3 py-3 rounded-lg font-medium flex items-center justify-center transition-all ${
                    isInterested
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 mr-2 ${isInterested ? 'fill-current' : ''}`}
                  />
                  {isInterested ? 'Interested' : "I'm Interested"}
                </button>
                <button
                  onClick={handleRequestMeeting}
                  disabled={loading || isShortlisted}
                  className={`w-full mb-3 py-3 rounded-lg font-medium flex items-center justify-center transition-all ${
                    isShortlisted
                      ? 'bg-amber-100 text-amber-700'
                      : loading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isShortlisted ? (
                    <>
                      <StarOff className="w-5 h-5 mr-2" />
                      Meeting Requested
                    </>
                  ) : (
                    <>
                      <Star className="w-5 h-5 mr-2" />
                      Request Meeting
                    </>
                  )}
                </button>
                {isShortlisted && (
                  <button
                    onClick={handleCancelMeeting}
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center transition-all ${
                      loading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    <X className="w-5 h-5 mr-2" />
                    Cancel Meeting
                  </button>
                )}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      <Send className="w-4 h-4 mr-1" />
                      Share Project
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInvestorViewProject;