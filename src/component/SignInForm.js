import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/idea.png';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);
function SignInForm({ onSignUpClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='form-wrapper sign-in'>
      <Link to='/'><img src={Logo} alt='loding...' width={100}  /></Link>
      <form action='/signIn' method='POST'>
        <h2>Sign-in</h2>
        <div className='input-group'>
          <input 
            type='email' 
            name='SignInEmail' 
            id='SignInEmail' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='SignInEmail'><FontAwesomeIcon icon="fa-solid fa-envelope" />&nbsp;&nbsp; E-mail</label>
        </div>
        <div className='input-group'>
          <input 
            type='password' 
            name='SignInPassword' 
            id='SignInPassword' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor='SignInPassword'><FontAwesomeIcon icon="fa-solid fa-lock" />&nbsp;&nbsp; Password</label>
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
