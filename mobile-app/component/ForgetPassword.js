import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import OtpVerification from './OtpVerification';
import EmailForget from './EmailForget';
import ResetPasswordForm from './ResetPasswordForm';
import Success from './Success';
import { useFunctions } from '../useFunctions';

export default function ForgetPassword({ onSignIn }) {
    const [step, setStep] = useState(4);
  
    const {
      sendOtp,
      verifyOtpForPasswordReset,
      resetPassword,
      resendForgetPasswordOtp,
      setLoading,
      setError,
      loading,
      error,
    } = useFunctions();
  
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
              onNext={() => {setStep(3)}}
              onBack={() => {setStep(1)}}
              verifyOtp={() => {verifyOtpForPasswordReset()}}
              resendOtp={() => {resendForgetPasswordOtp()}}
              setLoading={setLoading}
              setError={setError}
              loading={loading}
              error={error}
              otpPurpose="forgetPassword"
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
              error={error}
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
