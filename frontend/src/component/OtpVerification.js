import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/idea.png';

function OtpVerification({
  formData,
  backendError,
  timer,
  otp,
  handleOtpChange,
  handleVerifyOtp,
  handleResendOtp,
  formatTime,
  isTimerActive,
  setStep,
  otpDesignForm,
  loading,
}) {
  return (
    <>
    {
        otpDesignForm === 'sign-in-form' ?
        (
            <form className={otpDesignForm}>
                <Link to='/'><img src={Logo} alt='loading...' width={100} /></Link>
                <h2 className="title">OTP Verification</h2>
                <p className='UserEmailVerification'>Please Enter The 4 Digit Code Sent To<br /> {formData.email}</p>
                {backendError && (
                    <div className="error-box">
                    <p className="error-message">{backendError}</p>
                    </div>
                )}
                <p className="timer">Time left: {formatTime(timer)}</p>
                <div className="otpInputs">
                    {otp.map((digit, index) => (
                    <React.Fragment key={index}>
                        <input
                        type="text"
                        name={`otp-${index}`}
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        className="otpInput"
                        required
                        />
                    </React.Fragment>
                    ))}
                </div>
                <button type="button" className="btn solid" onClick={handleVerifyOtp}>
                    Verify OTP
                </button>
                <p className="forgot-pass">
                    <Link to="#" onClick={() => setStep('signIn')}>Back to Sign In</Link>
                </p>
                <p>Didn't receive OTP? <Link to='#' onClick={handleResendOtp} disabled={isTimerActive}>Resend code</Link></p>
            </form>
        )
        :
        (
            <form className={otpDesignForm}>
                    <Link to='/'><img src={Logo} alt='loading...' width={100} /></Link>
                    <h2 className="title">Verify Your Email</h2>
                    {formData.email && <p className='UserEmailVerification'>Please Enter The 4 Digit Code Sent To <br /> {`${formData.email}`}</p>}
                    {backendError && (
                    <div className="error-box">
                        <p className="error-message">{backendError}</p>
                    </div>
                    )}
                    <p className="timer">Time left: {formatTime(timer)}</p>
                    <div className="otpInputs">
                    {otp.map((digit, index) => (
                        <React.Fragment key={index}>
                        <input
                            type="text"
                            name={`otp-${index}`}
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            maxLength="1"
                            required
                        />
                        {index < otp.length - 1 && <span className="divider">-</span>}
                        </React.Fragment>
                    ))}
                    </div>
                    <button className="btn" type="button" onClick={handleVerifyOtp} disabled={loading || otp.join('').length !== 4}>Verify</button>
                    <p>Didn't receive OTP? <Link to='#' onClick={handleResendOtp} disabled={!isTimerActive}>Resend code</Link></p>
            </form>
        )
    }
    </>
  );
}

export default OtpVerification;
