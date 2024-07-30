import React, { useState, useEffect } from 'react';
import { useFunctions } from '../useFunctions';
import Success from './Success';
import OtpVerification from './OtpVerification';
import SignUpFormFields from './SignUpFormFields';

function SignUpForm({ handleSignInClick }) {
  const {
    signUp,
    verifyOtp,
    resendOtp,
    loading,
    isOtpSent,
  } = useFunctions();

  const [formError, setFormError] = useState({});
  const [backendError, setBackendError] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [, setIsOtpVerified] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [step, setStep] = useState('signup');

  const [formData, setFormData] = useState({
    role: 'investor',
    fullName: '',
    email: '',
    password: '',
  });

  

  useEffect(() => {
    if (isOtpSent && isTimerActive) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isOtpSent, isTimerActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const validate = (name, value) => {
    let errors = { ...formError };

    switch (name) {
      case 'fullName':
        if (!value) {
          errors.fullName = 'Full Name is required.';
        } else {
          delete errors.fullName;
        }
        break;
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errors.email = 'E-mail is required.';
        } else if (!emailPattern.test(value)) {
          errors.email = 'Email must be formatted correctly.';
        } else {
          delete errors.email;
        }
        break;
      case 'password':
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if (!value) {
          errors.password = 'Password is required.';
        } else if (!passwordPattern.test(value)) {
          errors.password = 'Password must be at least 6 characters long and contain at least one lower and upper character, one number, and one symbol.';
        } else {
          delete errors.password;
        }
        break;
      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = 'Confirm Password is required.';
        } else if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match.';
        } else {
          delete errors.confirmPassword;
        }
        break;
      default:
        break;
    }
    setFormError(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(formData).forEach((key) => validate(key, formData[key]));

    if (Object.keys(formError).length === 0) {
      try {
        setBackendError(null);
        await signUp(formData);
        setStep('otp');
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.response?.data?.general || err.message || 'An error occurred. Please try again.';
        setBackendError(errorMessage);
      }
    }
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) { // Only allow a single digit
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to the next input field
      if (value && index < otp.length - 1) {
        document.querySelector(`input[name="otp-${index + 1}"]`).focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    const combinedOtp = otp.join('');
    if (combinedOtp.length === 4) {
      try {
        setBackendError(null);
        await verifyOtp(formData, combinedOtp);
        setIsOtpVerified(true);
        setStep('success');
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.response?.data?.general || err.message || 'An error occurred. Please try again.';
        setBackendError(errorMessage);
      }
    } else {
      setBackendError('OTP must be 4 digits long');
    }
  };

  const handleResendOtp = async () => {
    try {
      setBackendError(null);
      setIsTimerActive(true); // Restart the timer
      setTimer(180); // Reset timer to 3 minutes
      await resendOtp(formData.email);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.general || err.message || 'An error occurred. Please try again.';
      setBackendError(errorMessage);
    }
  };

  let content;

  if (step === 'signup') {
    content = (
      <SignUpFormFields
        formData={formData}
        formError={formError}
        backendError={backendError}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );
  } else if (step === 'otp') {
    content = (
      <OtpVerification
        formData={formData}
        backendError={backendError}
        timer={timer}
        otp={otp}
        loading={loading}
        handleOtpChange={handleOtpChange}
        handleVerifyOtp={handleVerifyOtp}
        handleResendOtp={handleResendOtp}
        formatTime={formatTime}
        isTimerActive={isTimerActive}
        setStep={setStep}
        otpDesignForm={'sign-up-form'}
      />
    );
  } else if (step === 'success') {
    content = (
      <Success
        setStep={setStep}
        AddDesignFormClass={'sign-up-form'}
        HeaderMessage={'Verification Successful!'}
        SubTextMessage={"You've been successfully registered."}
        formDirection={'signup'}
      />
    );
  }

  return content;
}

export default SignUpForm;
