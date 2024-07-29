import React, { useState, useEffect } from 'react';
import { useFunctions } from '../useFunctions';
import { Link } from 'react-router-dom';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../assets/idea.png';

library.add(fas);

function SignUpForm({ handleSignInClick }) {
  const [formError, setFormError] = useState({});
  const [backendError, setBackendError] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);


  const [formData, setFormData] = useState({
    role: 'investor',
    fullName: '',
    email: '',
    password: '',
  });
  
  const {
    signUp,
    verifyOtp,
    resendOtp,
    loading,
    isOtpSent,
  } = useFunctions();

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
      case 'fullName': {
        if (!value) {
          errors.fullName = 'Full Name is required.';
        } else {
          delete errors.fullName;
        }
        break;
      }

      case 'email': {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errors.email = 'E-mail is required.';
        } else if (!emailPattern.test(value)) {
          errors.email = 'Email must be formatted correctly.';
        } else {
          delete errors.email;
        }
        break;
      }

      case 'password': {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if (!value) {
          errors.password = 'Password is required.';
        } else if (!passwordPattern.test(value)) {
          errors.password = 'Password must be at least 6 characters long and contain at least one lower and upper characters one number and one symbol.';
        } else {
          delete errors.password;
        }
        break;
      }

      case 'confirmPassword': {
        if (!value) {
          errors.confirmPassword = 'Confirm Password is required.';
        } else if (value !== formData.password) {
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
        // Optionally handle additional logic after successful sign-up
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.general ||
          err.message ||
          'An error occurred. Please try again.';
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
        // Optionally handle additional logic after successful OTP verification
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

  const handleResendOtp = async () => {
    try {
      setBackendError(null);
      setIsTimerActive(true); // Restart the timer
      setTimer(180); // Reset timer to 3 minutes
      await resendOtp(formData.email);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.general ||
        err.message ||
        'An error occurred. Please try again.';
      setBackendError(errorMessage);
    }
  };

  let content;

  if (!isOtpSent) {
    content = (
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <Link to='/'><img src={Logo} alt='loading...' width={100} /></Link>
        <h2 className="title">Sign up</h2>
        {backendError && (
          <div className="error-box">
            <p className="error-message">{backendError}</p>
          </div>
        )}
        <div className="switch-container">
          <label className={`switch-label ${formData.role === 'investor' ? 'active' : ''}`}>
            <input type="radio" name="role" value="investor" checked={formData.role === 'investor'} onChange={handleChange} />
            Investor
          </label>
          <label className={`switch-label ${formData.role === 'entrepreneur' ? 'active' : ''}`}>
            <input type="radio" name="role" value="entrepreneur" checked={formData.role === 'entrepreneur'} onChange={handleChange} />
            Entrepreneur
          </label>
        </div>
        <div className={`input-field ${formError.fullName ? 'error' : ''}`}>
          <FontAwesomeIcon icon="fa-solid fa-user" />
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        {formError.fullName && <span className='inputErrorMessage'>{formError.fullName}</span>}
        <div className={`input-field ${formError.email ? 'error' : ''}`}>
          <FontAwesomeIcon icon="fa-solid fa-envelope" />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {formError.email && <span className='inputErrorMessage'>{formError.email}</span>}
        <div className={`input-field ${formError.password ? 'error' : ''}`}>
          <FontAwesomeIcon icon="fa-solid fa-lock" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {formError.password && <span className='inputErrorMessage'>{formError.password}</span>}
        <div className={`input-field ${formError.confirmPassword ? 'error' : ''}`}>
          <FontAwesomeIcon icon="fa-solid fa-lock" />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {formError.confirmPassword && <span className='inputErrorMessage'>{formError.confirmPassword}</span>}
        <input type="submit" className="btn" value="Sign up" disabled={loading || Object.keys(formError).length > 0} />
      </form>
    );
  } else if (!isOtpVerified) {
    content = (
      <form className="sign-up-form">
        <Link to='/'><img src={Logo} alt='loading...' width={100} /></Link>
        <h2 className="title">Verify Your Email</h2>
        {formData.email && <p className='UserEmailVerification'>Please Enter The 4 Digit Code Sent To <br /> {`${formData.email}`}</p>}
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
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                maxLength="1"
                required
              />
              {index < otp.length - 1 && <span className="divider">-</span>}
            </React.Fragment>
          ))}
        </div>
        <button className="btn" type="button" onClick={handleVerifyOtp} disabled={loading || otp.join('').length !== 4}>Verify</button>
        <p>Didn't receive OTP? <Link to='#' onClick={handleResendOtp} disabled={!isTimerActive}>Resend code</Link></p>
      </form>
    );
  } else {
    content = (
      <form className="sign-up-form" onSubmit={handleSignInClick}>
        <div className='SuccessverificationImage'>
          <FontAwesomeIcon icon="fa-solid fa-check" />
        </div>
        <h2>Verification Successful!</h2>
        <p>You've been successfully registered.</p>
      </form>
    );
  }

  return content;
}

export default SignUpForm;