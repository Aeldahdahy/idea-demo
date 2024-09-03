import React, { useState } from 'react';
import { useFunctions } from '../useFunctions';
import { Link } from 'react-router-dom';
import EmployeePortalBackGround from '../assets/EmployeePortalBackGround.mp4';
import Logo from '../assets/idea.png';

function EmployeeSignForm() {
  const { StaffSignIn, loading, backendError } = useFunctions();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting in the traditional way
    setError(null);

    try {
      await StaffSignIn(formData);
    } catch (err) {
      setError(backendError || `Failed to sign in. ${err.message}`);
    }
  };

  return (
    <div className="background-video-container">
    <video autoPlay muted loop className="background-video">
      <source src={EmployeePortalBackGround} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="form-container">
    <div className='formHeaderEmployee'>
      <img src={Logo} alt='loading' />
      <div className='formTitle'>Staff Portal</div>
    </div>
    <form onSubmit={handleSubmit}>
        <div className='inputLabelEmployee'>
          <label htmlFor="username">Employee ID:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className='inputLabelEmployee'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button type="submit" className='MainButton'>Log in</button>
        )}
    </form>
    <div className='forgetPasswordEmployee'>
      <Link className='forgetPasswordEmployeeLink'>Forgot your password?</Link>
    </div>
    </div>
  </div>
  );
}

export default EmployeeSignForm;
