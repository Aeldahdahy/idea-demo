import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/idea.png';

function ResetPasswordForm({
  newPassword,
  formError,
  backendError,
  loading,
  handleChange,
  handleSubmit,
  setStep,
}) {
  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <Link to='/'><img src={Logo} alt='loading...' width={100} /></Link>
      <h2 className="title">Reset Password</h2>
      <p className='UserEmailVerification'>Please Enter The New Password For Your Account</p>
      {backendError && (
        <div className="error-box">
          <p className="error-message">{backendError}</p>
        </div>
      )}
      <div className="input-field">
        <FontAwesomeIcon icon="fa-solid fa-lock" />
        <input
          type="password"
          placeholder="New Password"
          name='password'
          value={newPassword.password}
          onChange={handleChange}
          required
        />
      </div>
      {formError.password && <span className='inputErrorMessage'>{formError.password}</span>}
      <div className="input-field">
        <FontAwesomeIcon icon="fa-solid fa-lock" />
        <input
          type="password"
          placeholder="Confirm Password"
          name='confirmPassword'
          value={newPassword.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      {formError.confirmPassword && <span className='inputErrorMessage'>{formError.confirmPassword}</span>}
      <button type="submit" className="btn solid" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      <p className="forgot-pass">
        <Link to="#" onClick={() => setStep('signIn')}>Back to Sign In</Link>
      </p>
    </form>
  );
}

export default ResetPasswordForm;
