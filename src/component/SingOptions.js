import React, { useRef } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

function SingOptions() {
  const wrapperRef = useRef(null);

  const handleSignUpClick = () => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.classList.add('animate-signIn');
      wrapper.classList.remove('animate-signUp');
    }
  };

  const handleSignInClick = () => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.classList.add('animate-signUp');
      wrapper.classList.remove('animate-signIn');
    }
  };

  return (
    <div className='SignContainer'>
      <div className='wrapper' ref={wrapperRef}>
        <SignUpForm onSignInClick={handleSignInClick} />
        <SignInForm onSignUpClick={handleSignUpClick} />
      </div>
    </div>
  );
}

export default SingOptions;
