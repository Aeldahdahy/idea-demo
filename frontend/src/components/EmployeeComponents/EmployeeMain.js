import React from 'react';
import { useDispatch } from 'react-redux';
import { openPopup } from '../../redux/checkpopupSlice'; // Ensure correct import

function EmployeeMain() {
  const dispatch = useDispatch();

  // Function to trigger different popup types
  const handleTestPopup = (type) => {
    dispatch(openPopup({
      message: `The user is added ${type}`,
      buttonText: 'Done',
      type: type, 
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
    </>
  );
}

export default EmployeeMain;
