import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import LogImage from '../assets/log.svg';
import RegisterImage from '../assets/register.svg';
// import Logo from '../assets/idea.png';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';


library.add(fas);




function ClientSignForm() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  return (
    <div className={`SignContainer ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <SignInForm handleSignInClick={handleSignInClick} />
          <SignUpForm handleSignUpClick={handleSignUpClick} />
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3> Do not have an account?</h3>
            <p>
             {/*  */}
            </p>
            <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src={LogImage} className="image" alt="log" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already have an account?</h3>
            <p>
              {/*  */}
            </p>
            <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src={RegisterImage} className="image" alt="register" />
        </div>
      </div>
    </div>
  );
}

export default ClientSignForm;

// import React, { useRef } from 'react';
// import SignInForm from './SignInForm';
// import SignUpForm from './SignUpForm';

// function SingOptions({ onClose }) {
 
//   const wrapperRef = useRef(null);

//   const handleSignUpClick = () => {
//     const wrapper = wrapperRef.current;
//     if (wrapper) {
//       wrapper.classList.add('animate-signIn');
//       wrapper.classList.remove('animate-signUp');
//     }
//   };

//   const handleSignInClick = () => {
//     const wrapper = wrapperRef.current;
//     if (wrapper) {
//       wrapper.classList.add('animate-signUp');
//       wrapper.classList.remove('animate-signIn');
//     }
//   };

//   return (
//     <div className='SignContainer'>
//       <div className='wrapper' ref={wrapperRef}>
//         <SignInForm onSignUpClick={handleSignUpClick} onClick={onClose} />
//         <SignUpForm onSignInClick={handleSignInClick} />
//       </div>
//     </div>
//   );
// }

// export default SingOptions;