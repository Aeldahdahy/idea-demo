import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFunctions } from '../useFunctions';

function SignUpForm({ onSignInClick }) {
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { signUp, loading, error } = useFunctions();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      // Optionally handle additional logic after successful sign-up
    } catch (err) {
      // Error handling is already done in the hook, but you can add more here if needed
    }
  };
  
  return (
    <div className='form-wrapper sign-up'>
      <form onSubmit={handleSubmit}>
        <h2>Sign-Up</h2>
        <div className='input-group'>
          <input
            type='text'
            name='fullName'
            id='SignUpFullName'
            value={formData.fullName}
            onChange={handleChange}
          />
          <label htmlFor='SignUpFullName'>Full Name</label>
        </div>
        <div className='input-group'>
          <input
            type='email'
            name='email'
            id='SignUpEmail'
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor='SignUpEmail'>E-mail</label>
        </div>
        <div className='input-group'>
          <input
            type='password'
            name='password'
            id='SignUpPassword'
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor='SignUpPassword'>Password</label>
        </div>
        <div className='input-group'>
          <input
            type='password'
            name='confirmPassword'
            id='SignUpConfirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <label htmlFor='SignUpConfirmPassword'>Confirm Password</label>
        </div>
        <button type='submit' className='MainButton' disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {error && <p className='error-message'>Error: {error.message}</p>}
        <div className='sign-link'>
          <p>Already have an account? <Link to='#' className='signIn-link' onClick={onSignInClick}>Sign In</Link></p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
