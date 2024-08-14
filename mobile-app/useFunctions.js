import { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useFunctions = () => {

  // State hooks
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(180); 
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({});
  const [backendError, setBackendError] = useState(null);

  // Helper functions
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  const signUp = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const otpResponse = await axios.post('http://127.0.0.1:2000/api/signup', { email: formData.email });
      if (otpResponse.status === 200) {
        setIsOtpSent(true);
        return otpResponse.data;
      } else {
        throw otpResponse.data;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (formData, otp) => {
    setLoading(true);
    setError(null);
    try {
      const verifyResponse = await axios.post('http://127.0.0.1:2000/api/verify-otp', {
        email: formData.email,
        otp,
        role: formData.role,
        fullName: formData.fullName,
        password: formData.password,
      });

      if (verifyResponse.status === 201) {
        setIsOtpVerified(true);
        return verifyResponse.data;
      } else {
        setError(verifyResponse.data.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('http://127.0.0.1:2000/api/signup', { email });
      setIsTimerActive(true);
      setTimer(180);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOtpSent && isTimerActive) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isOtpSent, isTimerActive]);

  const signIn = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://10.0.2.2:2000/api/signin', {
        email: formData.email,
        password: formData.password,
      });
      
  
      if (response.status === 200) {
        const { token } = response.data;
        await AsyncStorage.setItem('authToken', token);
        const decodedToken = jwtDecode(token);
        await AsyncStorage.setItem('userFullName', decodedToken.user.fullName);
        return response.data;
      } else {
        setError('Sign-in failed. Please try again.');
      }
    } catch (err) {
      console.error('Network Error Details:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'An error occurred while connecting. Please check your request.');
      throw err;
    }finally {
      setLoading(false);
    }
  };
  
  

  const sendOtp = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:2000/api/send-otp', { email });
      if (response.status === 200) {
        setIsOtpSent(true);
      }
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const validate = (formData) => {
    const errors = {};
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.fullName) errors.fullName = 'Full Name is required';
    if (!formData.role) errors.role = 'Role is required';
    return errors;
  };

  const contactUs = async (contactData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:2000/api/contact-us', contactData);
      if (response.status === 200) {
        Alert.alert('Success', 'Your message has been sent.');
      }
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return { 
    signIn,
    signUp,
    setOtp,
    sendOtp,
    validate,
    contactUs,
    resendOtp,
    verifyOtp,
    chunkArray,
    formatTime,
    error,
    loading,
    response,
    isOtpSent,
    isOtpVerified,
    isTimerActive,
    formError,
    backendError,
  };
};
