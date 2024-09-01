import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import OtpVerification from './OtpVerification';
import EmailForget from './EmailForget';
import ResetPasswordForm from './ResetPasswordForm';
import Success from './Success';
import { useFunctions } from '../useFunctions';
import { Color } from '../GlobalStyles';

export default function ForgetPassword({ onSignIn }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(180); 
  const [isTimerActive, setIsTimerActive] = useState(true);

  const {
    sendOtp,
    verifyOtpForPasswordReset,
    resetPassword,
    resendForgetPasswordOtp,
    setLoading,
    setError,
    loading,
  } = useFunctions();

  useEffect(() => {
    let interval;
    if (isTimerActive && step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timer, isTimerActive, step]);

  const handleSendOtp = async () => {
    if (!email) {
        const errorMessage = "Please enter your email.";
        setError(errorMessage);
        Alert.alert("Input Error", errorMessage);
        return;
    }

    setLoading(true);
    setError(null);
    setTimer(180);


    try {
        await sendOtp(email);
        setStep(2); // Move to the next step after sending OTP
    } catch (error) {
        // Detailed error logging
        console.error("Send OTP Error:", error);

        const errorMessage = error.message || 'Failed to send OTP. Please try again.';
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
    } finally {
        setLoading(false);
    }
};


const handleVerifyOtp = async () => {
  const combinedOtp = otp.join('');

  if (combinedOtp.length !== 4) {
      Alert.alert("Error", "OTP must be 4 digits long");
      return;
  }

  setLoading(true);
  setError(null);

  try {
      await verifyOtpForPasswordReset(email, combinedOtp);
      setStep(3); // Move to the next step after successful OTP verification
  } catch (error) {
      // Detailed error logging
      console.error("Verify OTP Error:", error);

      const errorMessage = error.message || 'Failed to verify OTP. Please try again.';
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
  } finally {
      setLoading(false);
  }
};


const handleResendOtp = async () => {
  if (!email) {
      const errorMessage = "Please enter your email.";
      setError(errorMessage);
      Alert.alert("Input Error", errorMessage);
      return;
  }

  setLoading(true);
  setError(null);
  setIsTimerActive(true);
  setTimer(180);

  try {
      await resendForgetPasswordOtp(email);
      // Assuming the timer is handled correctly within resendForgetPasswordOtp
      console.log("OTP resend successful");
  } catch (error) {
      // Detailed error logging
      console.error("Resend OTP Error:", error);

      const errorMessage = error.message || 'Failed to resend OTP. Please try again.';
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
  } finally {
      setLoading(false);
  }
};


const handleResetPassword = async () => {
  if (!password || !confirmPassword) {
      const errorMessage = "Please enter your new password and confirmation.";
      setError(errorMessage);
      Alert.alert("Input Error", errorMessage);
      return;
  }

  if (password !== confirmPassword) {
      const errorMessage = "New Password and Confirm Password do not match.";
      setError(errorMessage);
      Alert.alert("Input Error", errorMessage);
      return;
  }

  setLoading(true);
  setError(null);

  try {
      await resetPassword({ email, newPassword: password });
      setStep(4); // Move to the next step after successful password reset
  } catch (error) {
      // Detailed error logging
      console.error("Reset Password Error:", error);

      const errorMessage = error.message || 'Failed to reset password. Please try again.';
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
  } finally {
      setLoading(false);
  }
};


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <EmailForget
            email={email}
            setEmail={setEmail}
            handleSendOtp={handleSendOtp}
            onBack={() => onSignIn()}
          />
        );
      case 2:
        return (
          <OtpVerification
            otp={otp}
            setOtp={setOtp}
            handleVerifyOtp={handleVerifyOtp}
            handleResendOtp={handleResendOtp}
            timer={timer}
            isTimerActive={isTimerActive}
            onBack={() => setStep(1)}
            otpPurpose="Verify your email for Password Reset"
            loading={loading}
            email={email}
            setEmail={setEmail}
          />
        );
      case 3:
        return (
          <ResetPasswordForm
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleResetPassword={handleResetPassword}
            onBack={() => setStep(2)}
            loading={loading}
          />
        );
      case 4:
        return (
          <Success
            onNext={() => onSignIn()}
            HeaderText="Password Changed!"
            SubText="Your password has been successfully changed."
            ButtonText="Back To Sign-in"
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color={Color.colorMidnightblue} /> : renderStep()}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
