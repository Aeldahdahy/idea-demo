import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react'; // Importing the X icon from lucide-react
import { useDispatch } from 'react-redux';
import { closeProjectData } from '../../redux/projectDataSlice';
import { toast } from 'react-toastify';

function EmployeeProjectPopUp({ typeProject = "View", initialProjectData = {} }) {
  const dispatch = useDispatch();

  const [isClosing, setIsClosing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('Rejected'); // Initialize status for toggle

  // Use initialProjectData from Redux instead of hardcoded data
  const projectData = initialProjectData;

  // If projectData is empty or invalid, return null to avoid rendering issues
  if (!projectData || !projectData.details) {
    return null;
  }

  // Handler for closing the popup
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      dispatch(closeProjectData()); // Dispatch the close action after the animation
    }, 300);
  };

  if (!isVisible) {
    return null;
  }

  // Handler for Next button
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handler for Back button
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handler for clicking a step number
  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  // Handlers for carousel navigation
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

  // Handler for comment input
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Handler for status toggle
  const handleStatusToggle = () => {
    const newStatus = status === 'Approved' ? 'Rejected' : 'Approved';
    setStatus(newStatus);
    console.log('Status updated to:', newStatus); // For demo purposes; replace with actual API call
  };

  // Handler for Submit button (for demo purposes, just logs the action)
  const handleSubmit = () => {
    console.log('Submitted:', { status, comment });
    handleClose();
  };

  // Render content based on the current step
  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="projectPopUpContent">
            <div className="contentRow">
              <div className="contentField">
                <label>Project Industry</label>
                <p>{projectData.details.step1.projectIndustry}</p>
              </div>
              <div className="contentField">
                <label>Project Stage</label>
                <p>{projectData.details.step1.projectStage}</p>
              </div>
            </div>
            <div className="contentRow">
              <div className="contentField">
                <label>Minimum Investment</label>
                <p>{projectData.details.step1.minimumInvestment}</p>
              </div>
              <div className="contentField">
                <label>Maximum Investment</label>
                <p>{projectData.details.step1.maximumInvestment}</p>
              </div>
            </div>
            <div className="contentRow">
              <div className="contentField">
                <label>Net Worth</label>
                <p>{projectData.details.step1.netWorth}</p>
              </div>
              <div className="contentField">
                <label>Deal Type</label>
                <p>{projectData.details.step1.dealType}</p>
              </div>
            </div>
            <div className="contentRow">
              <div className="contentField">
                <label>Project Location</label>
                <p>{projectData.details.step1.projectLocation}</p>
              </div>
              <div className="contentField">
                <label>Website</label>
                <p>{projectData.details.step1.website}</p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="projectPopUpContent descriptionContent">
            <div className="contentField">
              <label>Market Description:</label>
              <p>{projectData.details.step2.description.marketDescription}</p>
            </div>
            <div className="contentField">
              <label>Business Highlights:</label>
              <p>{projectData.details.step2.description.businessHighlights}</p>
            </div>
            <div className="contentField">
              <label>Financial Status:</label>
              <p>{projectData.details.step2.description.financialStatus}</p>
            </div>
            <div className="contentField">
              <label>Business Objectives:</label>
              <p>{projectData.details.step2.description.businessObjectives}</p>
            </div>
            <div className="contentField">
              <label>Business Description:</label>
              <p>{projectData.details.step2.description.businessDescription}</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="projectPopUpContent documentContent">
            <div className="contentRow">
              {projectData.details.step3.documents.map((doc, index) => (
                <div key={index} className="documentItem">
                  <div className="documentIcon" style={{ backgroundColor: doc.color }}>
                    <span>📄</span>
                  </div>
                  <div className="documentInfo">
                    <p>{doc.name}</p>
                    <span>{doc.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="projectPopUpContent commentContent">
            <div className='projectPopUpContentToggel'>
              <div className="toggleStatusContainer" onClick={handleStatusToggle}>
                <div className={`toggleStatus ${status === 'Approved' ? '' : 'active'}`}>
                  <span className="toggleCircle"></span>
                  <span className="toggleText">{status === 'Approved' ? 'Approved' : 'Rejected'}</span>
                </div>
              </div>
            </div>

            <div className="contentField">
              <label>Comment:</label>
              <textarea
                placeholder="Message..."
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`projectPopUp ${isClosing ? 'closing' : ''}`}>
      <div className="projectPopUpBody">
        {/* Header Section */}
        <div className="projectPopUpHeader">
          <h2></h2>
          <span className="close-btn" onClick={handleClose}>
            <X size={18} />
          </span>
        </div>

        {/* Main Content (Carousel and Wizard) */}
        <div className="projectPopUpMain">
          {/* Carousel Section */}
          <div className="projectPopUpCarousel">
            <div className="carouselWrapper">
              <img
                src={projectData.images[currentImageIndex]}
                alt={`Project Image ${currentImageIndex + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {projectData.images.length > 1 && (
                <>
                  <button className="carouselButton prev" onClick={handlePrevImage}>
                    ‹
                  </button>
                  <button className="carouselButton next" onClick={handleNextImage}>
                    ›
                  </button>
                </>
              )}
              {projectData.images.length > 1 && (
                <div className="carouselDots">
                  {projectData.images.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content Section with Wizard */}
          <div className="projectPopUpContentWrapper">
            <h2>{projectData.details.title}</h2>
            {/* Progress Indicator */}
            <div className="progressIndicator">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="stepContainer">
                  <div
                    className={`stepCircle ${currentStep === step ? 'active' : ''} ${
                      step < currentStep ? 'passed' : ''
                    }`}
                    onClick={() => handleStepClick(step)}
                    style={{ cursor: 'pointer' }}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`stepLine ${step < currentStep ? 'passed' : ''}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Dynamic Content */}
            {renderContent()}

            {/* Navigation Buttons */}
            <div className="navigationButtons">
              <button
                className="backButton"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                {currentStep === 1 ? 'Back' : 'Previous step'}
              </button>
              {currentStep < 4 ? (
                <button
                  className="nextButton"
                  onClick={handleNext}
                  disabled={currentStep === 4}
                >
                  Next step
                </button>
              ) : (
                <button className="nextButton" onClick={handleSubmit}>
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