import React from 'react';
import SignInForm from './SignInForm';

const PopUpSignInForm = ({ onClose }) => {
  return (
    <>
      <div className="popupOverlay" onClick={onClose}></div>
      <div className="popupContainer">
        <button className="popupCloseButton" onClick={onClose}>X</button>
        <div className="popupContent">
          <SignInForm />
        </div>
      </div>
    </>
  );
};

export default PopUpSignInForm;
