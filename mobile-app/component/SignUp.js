import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import RegisterForm from './RegisterForm';
import Identity from './Identity';
import OtpVerification from './OtpVerification';
import { useFunctions } from '../useFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUp({ onSignIn }) {
    const [step, setStep] = useState(1);
    const [identity, setIdentity] = useState('');
  
    const {
      signUp,
      verifyOtp,
      resendOtp,
      setLoading,
      setError,
      loading,
      error,
    } = useFunctions();
  
    useEffect(() => {
      const getIdentity = async () => {
        try {
          const savedIdentity = await AsyncStorage.getItem('identity');
          if (savedIdentity) {
            setIdentity(savedIdentity);
          }
        } catch (error) {
          console.error('Failed to retrieve identity:', error);
        }
      };
  
      getIdentity();
    }, []);
  
    const renderStep = () => {
      switch (step) {
        case 1:
          return (
            <Identity
              onNext={() => setStep(2)}
              onBack={() => onSignIn()}
            />
          );
        case 2:
          return (
            <RegisterForm
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
              identity={identity}
              onSignIn={() => onSignIn()}
              signUp={signUp}
            />
          );
        case 3:
          return (
            <OtpVerification
              onNext={() => onSignIn()} // Navigates back to sign-in on successful OTP verification
              onBack={() => setStep(2)}
              verifyOtp={() => {verifyOtp}}
              resendOtp={() => {resendOtp}}
              setLoading={setLoading}
              setError={setError}
              loading={loading}
              error={error}
              otpPurpose="signUp"
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

const styles  = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        justifyContent:'center',
        alignItems:'center',
    },
});
