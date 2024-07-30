import React from 'react';
import contactlogo from '../assets/idea.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


function Contact() {
  return (
    <div className='contact-container'>
      <div className='contact-logo'>
        <img src={contactlogo} alt='Contact Logo' />
      </div>
      <div className='contact-header'>
        <h1>Contact Us</h1>
      </div>
      <div className='contact-love'>
        <p>We would love to hear your feedback</p>
      </div>
      <form className='contact-form'>
        <div className='input-container'>
          <FontAwesomeIcon icon={faUser} />
          <input type='text' placeholder='Enter your full name' name='name' required />
        </div>
        <div className='input-container'>
          <FontAwesomeIcon icon={faEnvelope} />
          <input type='email' placeholder='Enter your email' name='email' required />
        </div>
        <div className='input-container'>
          <textarea name='message' placeholder='Enter your message' required></textarea>
        </div>
        <button type='submit' className='submit-button'>Send</button>
      </form>
    </div>
  );
}

export default Contact;
