import React, { useState } from 'react';
import contactlogo from '../assets/idea.png';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFunctions } from '../useFunctions';

library.add(fas);

function Contact() {
  const { loading, response, error, contactUs } = useFunctions();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contactUs(formData);
  };

  return (
    <>
      <div className='space'></div>
      <div className='contact'>
        <div className='contact-logo'>
          <img src={contactlogo} alt='Contact Logo' />
        </div>
        <div className='contact-header'>
          <h1>Contact Us</h1>
        </div>
        <div className='contact-love'>
          <p>We would love to hear your feedback</p>
        </div>
        {response && 
        <div className="success-box">
          <p className="success-message">{response}</p>
        </div>
        }
        {error && 
        <div className="error-box">
          <p className="error-message">{error}</p>
        </div>
        }
        <form className='contact-form' onSubmit={handleSubmit}>
          <div className='contactNameEmail'>
            <div className='input-container'>
              <FontAwesomeIcon icon="user" />
              <input 
                type="text" 
                name="fullname" 
                value={formData.fullname} 
                onChange={handleChange} 
                placeholder="Full Name" 
                required
              />
            </div>
            <div className='input-container'>
              <FontAwesomeIcon icon="envelope" />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
                required
              />
            </div>
          </div>
          <div className='textBox-container'>
            <span className='textBoxTitle'>Message:</span>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              placeholder="Message"
              required
            />
          </div>
          <button type='submit' className='MainButton' disabled={loading}>Submit</button>
        </form>
        {loading && <p>Loading...</p>}
      </div>
      <div className='space'></div>
    </>
  );
}

export default Contact;
