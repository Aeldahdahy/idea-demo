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
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await sendOtp(email);
      setStep(2);
    } catch (error) {
      setError(error.message || 'Failed to send OTP');
      Alert.alert("Error", error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const combinedOtp = otp.join('');
    if (combinedOtp.length === 4) {
      setLoading(true);
      setError(null);

      try {
        await verifyOtpForPasswordReset(email, combinedOtp);
        setStep(3);
      } catch (error) {
        setError(error.message || 'Failed to verify OTP');
        Alert.alert("Error", error.message || 'Failed to verify OTP');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Error", "OTP must be 4 digits long");
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError(null);
    setIsTimerActive(true);
    setTimer(180);

    try {
      await resendForgetPasswordOtp(email);
    } catch (error) {
      setError(error.message || 'Failed to resend OTP');
      Alert.alert("Error", error.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please enter your new password and confirmation.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "New Password and Confirm Password do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await resetPassword({ email, newPassword: password });
      setStep(4);
    } catch (error) {
      setError(error.message || 'Failed to reset password');
      Alert.alert("Error", error.message || 'Failed to reset password');
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
