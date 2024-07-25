import React, { useState } from 'react';
import { useFunctions } from '../useFunctions';
import { Link } from 'react-router-dom';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../assets/idea.png';

library.add(fas);

function SignUpForm() {
  const [formData, setFormData] = useState({
    role: 'investor',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '', // Added confirmPassword field
  });

  const { signUp, loading } = useFunctions();
  const [formError, setFormError] = useState({});
  const [backendError, setBackendError] = useState(null); // State for backend errors

  const validate = (name, value) => {
    let errors = { ...formError };

    switch (name) {
      case 'fullName':
        const fullNamePattern = /^[A-Za-z ]{6,}$/;
        if (!value) {
          errors.fullName = 'Full Name is required';
        } else if (!fullNamePattern.test(value) || value.split(' ').length > 3) {
          errors.fullName = 'Full Name must be at least 6 characters long, contain one or two spaces, and no special characters';
        } else {
          delete errors.fullName;
        }
        break;

      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errors.email = 'Email is required';
        } else if (!emailPattern.test(value)) {
          errors.email = 'Email is invalid';
        } else {
          delete errors.email;
        }
        break;

      case 'password':
        const passwordPattern = /^(?=.*[0-9])(?=.*[\W_]).{6,}$/;
        if (!value) {
          errors.password = 'Password is required';
        } else if (!passwordPattern.test(value)) {
          errors.password = 'Password must be at least 6 characters long and contain at least one number and one symbol';
        } else {
          delete errors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match';
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
    // Final validation before submission
    Object.keys(formData).forEach((key) => validate(key, formData[key]));

    if (Object.keys(formError).length === 0) {
      try {
        setBackendError(null); // Clear any previous backend errors
        await signUp(formData);
        // Optionally handle additional logic after successful sign-up
      } catch (err) {
        setBackendError(err.response?.data?.general || 'An error occurred'); // Extract backend error message
        console.log(err);
      }
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <Link to='/' ><img src={Logo} alt='loading...' width={100} /></Link>
      <h2 className="title">Sign up</h2>
      {backendError && (
        <div className="error-box">
          <p className="error-message">{backendError}</p>
        </div>
      )}
      {Object.keys(formError).length > 0 && (
        <div className="error-box">
          {formError.fullName && <p className="error-message">{formError.fullName}</p>}
          {formError.email && <p className="error-message">{formError.email}</p>}
          {formError.password && <p className="error-message">{formError.password}</p>}
          {formError.confirmPassword && <p className="error-message">{formError.confirmPassword}</p>}
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
      <div className="input-field">
        <FontAwesomeIcon icon="fa-solid fa-user" />
        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        {formError.fullName && <span className="error-message">{formError.fullName}</span>}
      </div>
      <div className="input-field">
        <FontAwesomeIcon icon="fa-solid fa-envelope" />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {formError.email && <span className="error-message">{formError.email}</span>}
      </div>
      <div className="input-field">
        <FontAwesomeIcon icon="fa-solid fa-lock" />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {formError.password && <span className="error-message">{formError.password}</span>}
      </div>
      <div className="input-field">
        <FontAwesomeIcon icon="fa-solid fa-lock" />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {formError.confirmPassword && <span className="error-message">{formError.confirmPassword}</span>}
      </div>
      <input type="submit" className="btn" value="Sign up" disabled={loading || Object.keys(formError).length > 0} />
    </form>
  );
}

export default SignUpForm;
