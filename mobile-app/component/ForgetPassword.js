import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import OtpVerification from './OtpVerification';
import EmailForget from './EmailForget';
import ResetPasswordForm from './ResetPasswordForm';
import Success from './Success';
import { useFunctions } from '../useFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ForgetPassword({ onSignIn }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);

  
    const {
      sendOtp,
      verifyOtpForPasswordReset,
      resendForgetPasswordOtp,
      resetPassword,
      setLoading,
      setError,
      loading,
      error,
    } = useFunctions();

    useEffect(()=>{
      const getEmail = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('email');
          if (storedEmail !== null){
            setEmail(storedEmail);
          } 
        } catch (error) {
          console.error('Failed to fetch the email from AsyncStorage', error);
        }
      };
      getEmail();
    }, []);
  
    const handleVerifyOtp = async () => {
      try {
        setLoading(true);
        const otpCode = otp.join('');
        const response = await verifyOtpForPasswordReset(email, otpCode);
        if (response === 200) {
          await AsyncStorage.removeItem('email');
          setStep(4);
        } else {
          setError('Invalid OTP. Please try again.');
        }
      } catch (error) {
        setError('Failed to verify OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const handleResendOtp = async () => {
      try {
        await resendForgetPasswordOtp(email);
      } catch (error) {
        setError('Failed to resend OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    };


    const renderStep = () => {
      switch (step) {
        case 1:
          return (
            <EmailForget
              onNext={() => {setStep(2)}}
              onBack={() => {onSignIn()}}
              sendOtp={sendOtp}
              setLoading={setLoading}
              setError={setError}
              loading={loading}
              error={error}
            />
          );
        case 2:
          return (
            <OtpVerification
              onBack={() => {setStep(1)}}
              handleVerifyOtp={handleVerifyOtp}
              handleResendOtp={handleResendOtp}
              emailAddress={email}
              otpPurpose={'Verify your email for Password Reset'}
              loading={loading}
              otp={otp}  
              setOtp={setOtp}
            />
          );
        case 3:
          return (
            <ResetPasswordForm
              onNext={() => {setStep(4)}} 
              onBack={() => {setStep(2)}}
              resetPassword={resetPassword}
              setLoading={setLoading}
              setError={setError}
              loading={loading}
            />
          );
        case 4:
          return (
            <Success
              onNext={() => {onSignIn()}} 
              HeaderText={'Password Changed!'}
              SubText={' Your password has been changed successfully.'}
              ButtonText={'Back To Sign-in'}
            />
          );
        default:
          return null;
      }
    };
  
    return (
      <View style={styles.container}>
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : renderStep()}
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
