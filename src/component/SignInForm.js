import React, { useState, useEffect } from 'react';
import { useFunctions } from '../useFunctions';
import SignInFormFields from './SignInFormFields';
import OtpVerification from './OtpVerification';
import ResetPasswordForm from './ResetPasswordForm';
import Success from './Success';

function SignInForm() {
  const {
    signIn,
    sendOtp,
    verifyOtpForPasswordReset,
    resetPassword,
    resendForgetPasswordOtp,
    setBackendError,
    formatTime,
    loading,
    formError,
    backendError,
    validate,
  } = useFunctions();

  const [formData, setFormData] = useState({ email: '', newPassword: '' });
  const [step, setStep] = useState('signIn');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState({ password: '', confirmPassword: '' });
  const [, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);
  
  

  useEffect(() => {
    let interval;
    if (isTimerActive && step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timer, isTimerActive, step]);
  // *


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (step === 'resetPassword') {
      setNewPassword({ ...newPassword, [name]: value });
      // Since you're in the 'resetPassword' step, use 'resetPassword' as the formType
      validate('resetPassword', name, value, { ...formData, ...newPassword });
    } else {
      setFormData({ ...formData, [name]: value });
      // Use 'signin' as the formType for sign-in step
      validate('signin', name, value, formData);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 'signIn') {
      // Validate formData for signIn step
      Object.keys(formData).forEach((key) => validate('signin', key, formData[key], formData));
  
      if (Object.keys(formError).length === 0) {
        try {
          setBackendError(null);
          await signIn(formData);
          // Optionally handle additional logic after successful sign-in
        } catch (err) {
          const errorMessage =
            err.response?.data?.message ||
            err.response?.data?.general ||
            err.message ||
            'An error occurred. Please try again.';
          setBackendError(errorMessage);
        }
      }
    } else if (step === 'resetPassword') {
      // Validate newPassword for resetPassword step
      Object.keys(newPassword).forEach((key) => validate('resetPassword', key, newPassword[key], { ...formData, ...newPassword }));
  
      if (Object.keys(formError).length === 0) {
        try {
          setBackendError(null);
          await resetPassword({ email: formData.email, newPassword: newPassword.password });
          setStep('success'); // Update the step to show success message
        } catch (err) {
          const errorMessage =
            err.response?.data?.message ||
            err.response?.data?.general ||
            err.message ||
            'An error occurred. Please try again.';
          setBackendError(errorMessage);
        }
      }
    }
  };
  

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
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
        await verifyOtpForPasswordReset(formData.email, combinedOtp);
        setOtpVerified(true);
        setStep('resetPassword');
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.general ||
          err.message ||
          'An error occurred. Please try again.';
        setBackendError(errorMessage);
      }
    } else {
      setBackendError('OTP must be 4 digits long');
    }
  };

  const handleForgotPassword = async () => {
    try {
      setBackendError(null);
      await sendOtp(formData.email);
      setStep('otp');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.general ||
        err.message ||
        'An error occurred. Please try again.';
      setBackendError(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    try {
      setBackendError(null);
      setIsTimerActive(true); // Restart the timer
      setTimer(180); // Reset timer to 3 minutes
      await resendForgetPasswordOtp(formData.email);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.general ||
        err.message ||
        'An error occurred. Please try again.';
      setBackendError(errorMessage);
    }
  };
// *
  

  let content;

  if (step === 'signIn') {
    content = (
      <SignInFormFields
        formData={formData}
        formError={formError}
        backendError={backendError}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleForgotPassword={handleForgotPassword}
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
      otpDesignForm={'sign-in-form'}
    />
    );
  } else if (step === 'resetPassword') {
    content = (
      <ResetPasswordForm
      newPassword={newPassword}
      formError={formError}
      backendError={backendError}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
    );
  } else if (step === 'success') {
    content = (
      <Success  
        setStep={setStep}  
        AddDesignFormClass={'sign-in-form'} 
        HeaderMessage={'Password Changed!'} 
        SubTextMessage={'Your password has been successfully changed.'} 
        formDirection={'signin'}
      />
    );
  }

  return <>{content}</>;
}

export default SignInForm;
