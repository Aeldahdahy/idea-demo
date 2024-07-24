import React from 'react';
import { Link } from 'react-router-dom';

function SignInForm({ onSignUpClick }) {

  return (
    <div className='form-wrapper sign-in'>
      <form action='/signIn' method='POST'>
        <h2>Sign-in</h2>
        <div className='input-group'>
          <input type='email' name='SignInEmail' id='SignInEmail' />
          <label htmlFor='SignInEmail'>E-mail</label>
        </div>
        <div className='input-group'>
          <input type='password' name='SignInPassword' id='SignInPassword' />
          <label htmlFor='SignInPassword'>Password</label>
        </div>
        <div className='forgot-pass'>
          <Link to='#'>Forgot Password?</Link>
        </div>
        <button type='submit' className='MainButton'>Sign In</button>
        <div className='sign-link'>
          <p>Don't have an account? <Link to='#' className='signUp-link' onClick={onSignUpClick}>Sign Up</Link></p>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
