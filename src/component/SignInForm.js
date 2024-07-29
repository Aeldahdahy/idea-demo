import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFunctions } from '../useFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/idea.png';

function SignInForm({ handleSignInClick }) {
  const {
    signIn,
    sendOtp,
    verifyOtpForPasswordReset,
    resetPassword,
    resendForgetPasswordOtp,
    loading,
  } = useFunctions();
  const [formError, setFormError] = useState({});
  const [backendError, setBackendError] = useState(null);
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

  const validate = (name, value) => {
    let errors = { ...formError };
    switch (name) {
      case 'email': {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errors.email = 'Please enter a valid email.';
        } else {
          delete errors.email;
        }
        break;
      }
      case 'password': {
        if (!value) {
          errors.password = 'Password is required.';
        } else {
          delete errors.password;
        }
        break;
      }
      case 'newPassword': {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if (!value) {
          errors.password = 'Password is required.';
        } else if (!passwordPattern.test(value)) {
          errors.password = 'Password must be at least 6 characters long and contain at least one lower and upper character, one number, and one symbol.';
        } else {
          delete errors.password;
        }
        break;
      }
      case 'confirmPassword': {
        if (!value) {
          errors.confirmPassword = 'Confirm Password is required.';
        } else if (value !== newPassword.password) {
          errors.confirmPassword = 'Passwords do not match.';
        } else {
          delete errors.confirmPassword;
        }
        break;
      }
      default:
        break;
    }
    setFormError(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (step === 'resetPassword') {
      setNewPassword({ ...newPassword, [name]: value });
      validate(name, value);
    } else {
      setFormData({ ...formData, [name]: value });
      validate(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 'signIn') {
      Object.keys(formData).forEach((key) => validate(key, formData[key]));

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
      Object.keys(newPassword).forEach((key) => validate(key, newPassword[key]));
      if (Object.keys(formError).length === 0) {
        try {
          setBackendError(null);
          await resetPassword({ email: formData.email, newPassword: newPassword.password }); // Ensure the field name matches
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  let content;

  if (step === 'signIn') {
    content = (
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <Link to='/'><img src={Logo} alt='loading...' width={100} /></Link>
        <h2 className="title">Sign in</h2>
        {backendError && (
          <div className="error-box">
            <p className="error-message">{backendError}</p>
          </div>
        )}
        <div className="input-field">
          <FontAwesomeIcon icon="fa-solid fa-envelope" />
          <input
            type="email"
            placeholder="Email"
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {formError.email && <span className='inputErrorMessage'>{formError.email}</span>}
        <div className="input-field">
          <FontAwesomeIcon icon="fa-solid fa-lock" />
          <input
            type="password"
            placeholder="Password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {formError.password && <span className='inputErrorMessage'>{formError.password}</span>}
        <button type="submit" className="btn solid" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>
        <p className="forgot-pass">
          <Link to="#" onClick={handleForgotPassword}>Forgot Password?</Link>
        </p>
        <p className="social-text">Or Sign in with social platforms</p>
        <div className="social-media">
          <Link to="#" className="social-icon">
            <FontAwesomeIcon icon={['fab', 'google']} />
          </Link>
          <Link to="#" className="social-icon">
            <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
          </Link>
        </div>
      </form>
    );
  } else if (step === 'otp') {
    content = (
      <form className="sign-in-form">
        <Link to='/'><img src={Logo} alt='loading...' width={100} /></Link>
        <h2 className="title">OTP Verification</h2>
        <p className='UserEmailVerification'>Please Enter The 4 Digit Code Sent To<br /> {formData.email}</p>
        {backendError && (
          <div className="error-box">
            <p className="error-message">{backendError}</p>
          </div>
        )}
        <p className="timer">Time left: {formatTime(timer)}</p>
        <div className="otpInputs">
          {otp.map((digit, index) => (
            <React.Fragment key={index}>
              <input
                type="text"
                name={`otp-${index}`}
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                className="otpInput"
                required
              />
            </React.Fragment>
          ))}
        </div>
        <button type="button" className="btn solid" onClick={handleVerifyOtp}>
          Verify OTP
        </button>
        <p className="forgot-pass">
          <Link to="#" onClick={() => setStep('signIn')}>Back to Sign In</Link>
        </p>
        <p>Didn't receive OTP? <Link to='#' onClick={handleResendOtp} disabled={isTimerActive}>Resend code</Link></p>
      </form>
    );
  } else if (step === 'resetPassword') {
    content = (
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <Link to='/'><img src={Logo} alt='loading...' width={100} /></Link>
        <h2 className="title">Reset Password</h2>
        <p className='UserEmailVerification'>Please Enter The New Password For Your Account</p>
        {backendError && (
          <div className="error-box">
            <p className="error-message">{backendError}</p>
          </div>
        )}
        <div className="input-field">
          <FontAwesomeIcon icon="fa-solid fa-lock" />
          <input
            type="password"
            placeholder="New Password"
            name='password'
            value={newPassword.password}
            onChange={handleChange}
            required
          />
        </div>
        {formError.password && <span className='inputErrorMessage'>{formError.password}</span>}
        <div className="input-field">
          <FontAwesomeIcon icon="fa-solid fa-lock" />
          <input
            type="password"
            placeholder="Confirm Password"
            name='confirmPassword'
            value={newPassword.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {formError.confirmPassword && <span className='inputErrorMessage'>{formError.confirmPassword}</span>}
        <button type="submit" className="btn solid resetPasswordButton" disabled={loading}>
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </button>
      </form>
    );
  } else if (step === 'success') {
    content = (
      <form className="sign-in-form" >
        <div className='SuccessverificationImage'>
          <FontAwesomeIcon icon="fa-solid fa-check" />
        </div>
        <h2>Password Changed!</h2>
        <p>Your password has been successfully changed.</p>
        <button type="submit" onClick={() => setStep('signIn')} className="btn solid backToSignInButton">
          Back To Sign In
        </button>
      </form>
    );
  }

  return <>{content}</>;
}

export default SignInForm;
