import React, { useState,
  //  useEffect, useCallback 
  } from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { closeProjectData } from '../../redux/projectDataSlice';
import { toast } from 'react-toastify';
import { useFunctions } from '../../useFunctions';

function EmployeeProjectPopUp({ typeProject = "View", initialProjectData = {} }) {
  const projectData = initialProjectData;
  const dispatch = useDispatch();
  const { API_BASE_URL, updateProject} = useFunctions();
  const [isClosing, setIsClosing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState(projectData.details.step4.state || 'Rejected');


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
    setStatus(newStatus); // UI update
    handleUpdateProject(projectData.details.step4.id, { status: newStatus }); // Backend update
    toast.success(`Project status updated to ${newStatus}`);
  };
  

  const handleSubmit = () => {
    console.log('Submitted:', { status, comment });
    handleClose();
  };

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
                <a
                  href={
                    projectData.details.step1.website.startsWith('http')
                      ? projectData.details.step1.website
                      : `https://${projectData.details.step1.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#007bff', textDecoration: 'underline' }}
                >
                  {projectData.details.step1.website}
                </a>
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
            {projectData.details.step3.documents.length === 0 ? (
              <p>No documents available.</p>
            ) : (
              <div className="contentRow">
                {projectData.details.step3.documents.map((doc, index) => (
                  <div key={index} className="documentItem">
                    <div className="documentIcon" style={{ backgroundColor: doc.color }}>
                      <span>📄</span>
                    </div>
                    <div className="documentInfo">
                      <p>{doc.name}</p>
                      <div className='documentInfomation'> 
                        <span>{doc.size}</span>
                        <a
                          href={`${API_BASE_URL}/${doc.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#007bff', textDecoration: 'underline' }}
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
        <div className="projectPopUpHeader">
          <h2> </h2>
          <span className="close-btn" onClick={handleClose}>
            <X size={18} />
          </span>
        </div>
        <div className="projectPopUpMain">
          <div className="projectPopUpCarousel">
            <div className="carouselWrapper">
              <img 
                src={projectData.images[currentImageIndex]} 
                alt={`Project ${currentImageIndex + 1}`} 
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
                  <div className="carouselDots">
                    {projectData.images.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="projectPopUpContentWrapper">
            <h2>{projectData.details.title}</h2>
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
                    <div className={`stepLine ${step < currentStep ? 'passed' : ''}`}></div>
                  )}
                </div>
              ))}
            </div>
            {renderContent()}
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