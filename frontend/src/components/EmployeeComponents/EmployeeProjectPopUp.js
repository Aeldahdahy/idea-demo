import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react'; // Importing the X icon from lucide-react
// import { useDispatch } from 'react-redux';
// import { closeProjectData } from '../../redux/projectDataSlice';
// import { useFunctions } from '../../useFunctions';
// import { toast } from 'react-toastify';
import img1 from '../../assets/img-0.39.png';
import img2 from '../../assets/img-0.40.png';
import img3 from '../../assets/img-0.41.png';

function EmployeeProjectPopUp() {
  const [isClosing, setIsClosing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('Rejected'); // Initialize status for toggle

  // Dummy data to simulate backend response
  const projectData = {
    images: [
      img1,
      img2,
      img3,
    ],
    details: {
      step1: {
        projectIndustry: 'Technology',
        projectStage: 'Seed',
        minimumInvestment: '100K EGP',
        maximumInvestment: '500K EGP',
        netWorth: '1.5M EGP',
        dealType: 'Funding',
        projectLocation: 'Egypt, Cairo',
        website: 'www.idea-venture.com',
      },
      step2: {
        description: {
          marketDescription:
            'The platform targets an untapped market of over 500,000 SMEs in the North American region, with a projected 20% annual growth rate in the CRM market.',
          businessHighlights:
            'Strategic partnerships with key players in the SaaS ecosystem.',
          financialStatus:
            'Revenue has grown 30% quarter-on-quarter, detailed P&L statement available upon request.',
          businessObjectives:
            'To expand market reach, enhance product features, and achieve a 50% revenue increase within 2 years.',
          businessDescription:
            'NextGen CRM solutions provides SMEs',
        },
      },
      step3: {
        documents: [
          { name: 'Business plan', size: '1.5 MB', color: '#40C4FF' },
          { name: 'Financial', size: '1.2 MB', color: '#4CAF50' },
          { name: 'Executive Summary', size: '1.3 MB', color: '#F44336' },
          { name: 'Additional Document', size: '1.4 MB', color: '#FFCA28' },
        ],
      },
      step4: {
        // No specific data needed for step 4, as it's a comment section
      },
      title: 'IDEA-Venture',
    },
  };

  // Handler for closing the popup
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
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