import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { closeProjectData } from '../../redux/projectDataSlice';
import { useFunctions } from '../../useFunctions';

function EmployeeProjectPopUp({ typeProject = "View", initialProjectData = {} }) {
  const projectData = initialProjectData;
  const dispatch = useDispatch();
  const { API_BASE_URL, updateProject } = useFunctions();
  const [isClosing, setIsClosing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState(projectData.details?.step4?.comment || '');
  const [status, setStatus] = useState(projectData.details?.step4?.state || 'Rejected');

  if (!projectData || !projectData.details) {
    return null;
  }

  const handleUpdateProject = (id, updatedData) => {
    updateProject(id, updatedData);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      dispatch(closeProjectData());
    }, 300);
  };

  if (!isVisible) {
    return null;
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? projectData.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === projectData.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleStatusToggle = () => {
    const newStatus = status === 'Approved' ? 'Rejected' : 'Approved';
    setStatus(newStatus);
    handleUpdateProject(projectData.details.step4.id, { status: newStatus });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      return;
    }
    const updatedData = {
      comment,
      status
    };
    try {
      await handleUpdateProject(projectData.details.step4.id, updatedData);
      handleClose();
    } catch (err) {
      console.error('Failed to submit comment:', err);
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Industry</label>
              <p className="text-sm text-gray-600">{projectData.details.step1.projectIndustry}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Stage</label>
              <p className="text-sm text-gray-600">{projectData.details.step1.projectStage}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Investment</label>
              <p className="text-sm text-gray-600">{projectData.details.step1.minimumInvestment}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Investment</label>
              <p className="text-sm text-gray-600">{projectData.details.step1.maximumInvestment}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Net Worth</label>
              <p className="text-sm text-gray-600">{projectData.details.step1.netWorth}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deal Type</label>
              <p className="text-sm text-gray-600">{projectData.details.step1.dealType}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Location</label>
              <p className="text-sm text-gray-600">{projectData.details.step1.projectLocation}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <a
                href={
                  projectData.details.step1.website.startsWith('http')
                    ? projectData.details.step1.website
                    : `https://${projectData.details.step1.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                {projectData.details.step1.website}
              </a>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Market Description</label>
              <p className="text-sm text-gray-600">{projectData.details.step2.description.marketDescription}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Highlights</label>
              <p className="text-sm text-gray-600">{projectData.details.step2.description.businessHighlights}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Financial Status</label>
              <p className="text-sm text-gray-600">{projectData.details.step2.description.financialStatus}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Objectives</label>
              <p className="text-sm text-gray-600">{projectData.details.step2.description.businessObjectives}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
              <p className="text-sm text-gray-600">{projectData.details.step2.description.businessDescription}</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            {projectData.details.step3.documents.length === 0 ? (
              <p className="text-sm text-gray-500">No documents available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectData.details.step3.documents.map((doc, index) => (
                  <div key={index} className="flex items-center bg-white shadow-sm rounded-lg p-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-md mr-3"
                      style={{ backgroundColor: doc.color }}
                    >
                      <span className="text-lg">📄</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{doc.size}</span>
                        <a
                          href={`${API_BASE_URL}/${doc.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <div
                className="inline-flex items-center cursor-pointer"
                onClick={handleStatusToggle}
                role="switch"
                aria-checked={status === 'Approved'}
              >
                <div
                  className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out ${
                    status === 'Approved' ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute left-0 inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
                      status === 'Approved' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </div>
                <span className="ml-2 text-sm text-gray-600">{status}</span>
              </div>
            </div>
            <form onSubmit={handleSubmitComment}>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Comment
              </label>
              <textarea
                id="comment"
                placeholder="Message..."
                value={comment}
                onChange={handleCommentChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden ${
        isClosing ? 'opacity-0 transition-opacity duration-300' : 'opacity-100'
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{projectData.details.title}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Carousel */}
          <div className="relative">
            <img
              src={projectData.images[currentImageIndex]}
              alt={`Project ${currentImageIndex + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
            {projectData.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                  {projectData.images.map((_, index) => (
                    <span
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Content */}
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <button
                    onClick={() => handleStepClick(step)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      currentStep === step
                        ? 'bg-blue-600 text-white'
                        : step < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                    aria-label={`Step ${step}`}
                  >
                    {step}
                  </button>
                  {step < 4 && (
                    <div
                      className={`h-1 w-8 ${
                        step < currentStep ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            {renderContent()}
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {currentStep === 1 ? 'Back' : 'Previous step'}
              </button>
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={currentStep === 4}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Next step
                </button>
              ) : (
                <button
                  onClick={handleSubmitComment}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProjectPopUp;