import React from 'react';
import { useDispatch } from 'react-redux';
import { openPopup } from '../../redux/checkpopupSlice';
import { openYesNoPopup } from '../../redux/yesNoPopupSlice';
import { openStaffData } from '../../redux/staffDataSlice';
import { openProjectData } from '../../redux/projectDataSlice';

// Dummy images (you can import these as in EmployeeProjectPopUp)
import img1 from '../../assets/img-0.39.png';
import img2 from '../../assets/img-0.40.png';
import img3 from '../../assets/img-0.41.png';

function EmployeeMain() {
  const dispatch = useDispatch();

  const handleTestPopup = (type) => {
    dispatch(openPopup({
      message: `The user is added ${type}`,
      buttonText: 'Done',
      type: type,
    }));
  };

  const handleYesNoPopup = () => {
    dispatch(openYesNoPopup({
      message: 'Are you sure?',
      buttonYes: 'Yes',
      buttonNo: 'No',
      type: 'confirmation',
    }));  
  };

  const handleOpenStaffPopup = () => {
    dispatch(openStaffData({
      header: 'Add New Staff',
      buttonText: 'Add',
      type: 'Add',
    }));
  };

  const handleOpenProjectPopup = () => {
    // Dummy project data (in a real app, this would come from an API or props)
    const projectData = {
      images: [img1, img2, img3],
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
        step4: {},
        title: 'IDEA-Venture',
      },
    };

    dispatch(openProjectData({
      header: 'View Project',
      buttonText: 'View',
      type: 'View',
      initialData: projectData, // Pass the project data to the Redux state
    }));
  };

  return (
    <>
      <h1>EmployeeMain</h1>
      <button onClick={() => handleTestPopup('success')} className="test-popup-button">
        Test Success Popup
      </button>
      <button onClick={() => handleTestPopup('error')} className="test-popup-button">
        Test Error Popup
      </button>
      <button onClick={() => handleTestPopup('warning')} className="test-popup-button">
        Test Warning Popup
      </button>
      <button onClick={handleYesNoPopup} className="test-popup-button">
        Test Yes/No Popup
      </button>
      <button onClick={handleOpenStaffPopup} className="test-popup-button">
        Add New Staff
      </button>
      <button onClick={handleOpenProjectPopup} className="test-popup-button">
        View Project
      </button>
    </>
  );
}

export default EmployeeMain;