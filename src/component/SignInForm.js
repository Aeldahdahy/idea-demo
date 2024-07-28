import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFunctions } from '../useFunctions';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import Logo from '../assets/idea.png';

library.add(fas);

function SignInForm() {
  const { signIn, loading } = useFunctions();
  const [formError, setFormError] = useState({});
  const [backendError, setBackendError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  }); 


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
      default:
        break;
    }
    setFormError(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(formData).forEach((key) => validate(key, formData[key]));

    if (Object.keys(formError).length === 0) {
      try {
        setBackendError(null);
        await signIn(formData);
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

  return (
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
        <Link to="#">Forgot Password?</Link>
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
      <div className="sign-link">
        {/* Additional links if needed */}
      </div>
    </form>
  );
}

export default SignInForm;
