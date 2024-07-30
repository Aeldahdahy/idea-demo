import React from 'react';
import { Link } from 'react-router-dom';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/idea.png';

library.add(fas);

function SignUpFormFields({ formData, formError, backendError, loading, handleChange, handleSubmit }) {
  return (
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
}

export default SignUpFormFields;
