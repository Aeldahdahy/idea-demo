import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
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

  // const API_BASE_URL = 'http://10.0.2.2:7030';
  const API_BASE_URL = 'https://idea-venture.agency';

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
      const response = await axios.post(`${API_BASE_URL}/api/signup`, { email: formData.email });
      if (response.status === 200) {
      setIsOtpSent(true);
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to send OTP' };
    }
  } catch (err) {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    
    if (err.response) {
      if (err.response.status === 400) {
        errorMessage = err.response.data?.message || 'Invalid email address. Please check and try again.';
      } else if (err.response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    } else if (err.message === 'Network Error') {
      errorMessage = 'Network error. Please check your internet connection.';
    }

    return { success: false, message: errorMessage };
  } finally {
    setLoading(false);
  }
};

const verifyOtp = async (formData, otp) => {
  setLoading(true);
  setError(null);
  
  try {
      const response = await axios.post(`${API_BASE_URL}/api/verify-otp`, {
          email: formData.email,
          otp,
          role: formData.role,
          fullName: formData.fullName,
          password: formData.password,
      });

      if (response.status === 201) {
          setIsOtpVerified(true);
          return { success: true, data: response.data };
      } else {
          const errorMessage = response.data.message || 'Failed to verify OTP. Please try again.';
          return { success: false, message: errorMessage };
      }
  } catch (err) {
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (err.response) {
          if (err.response.status === 400) {
              errorMessage = err.response.data?.message || 'Invalid OTP. Please check and try again.';
          } else if (err.response.status === 401) {
              errorMessage = 'Unauthorized access. Please check your credentials.';
          } else if (err.response.status === 500) {
              errorMessage = 'Server error. Please try again later.';
          }
      } else if (err.message === 'Network Error') {
          errorMessage = 'Network error. Please check your internet connection.';
      }

      return { success: false, message: errorMessage };
  } finally {
      setLoading(false);
  }
};


  const resendOtp = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/signup`, { email });
      
      if(response.status === 200){
        setIsTimerActive(true);
        setTimer(180);
      }else{
        const errorMessage = response.data.message || 'Faild to resend OTP. Please Try again.';
        setError(errorMessage);
      }
    } catch (err) {
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (err.response){
        if(err.response.status === 400){
          errorMessage = err.response.data?.message || 'Invalid email. Please check your input.';
        }else if (err.response.status === 500){
          errorMessage = 'Server error. Please try again later.';
        }
      }else if (err.message === 'Network Error'){
        errorMessage = 'Network error. Please check your internet connection.';
      }

      setError(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  const signIn = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/signin`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        await AsyncStorage.setItem('authToken', token);
        const decodedToken = jwtDecode(token);
        await AsyncStorage.setItem('userFullName', decodedToken.user.fullName);
        return { success: true, data: response.data };
      } else {
        return { success: false, message: 'Sign-in failed' };
      }
    } catch (err) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = err.response.data?.message || 'Invalid email or password.';
        } else if (err.response.status === 401) {
          errorMessage = 'Unauthorized access. Please check your credentials.';
        } else if (err.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (err.message === 'Network Error') {
        errorMessage = 'Network error. Please check your internet connection.';
      }
  
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

 const sendOtp = async (email) => {
    setLoading(true);
    setError(null);

    try {
        const response = await axios.post(`${API_BASE_URL}/api/forgot-password`, { email });

        if (response.status === 200) {
            setIsOtpSent(true);
            return { success: true, data: response.data };
        } else {
            const errorMessage = response.data.message || 'Failed to send OTP. Please try again.';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    } catch (err) {
        let errorMessage = 'An unexpected error occurred. Please try again.';

        if (err.response) {
            if (err.response.status === 400) {
                errorMessage = err.response.data?.message || 'Invalid request. Please check your input.';
            } else if (err.response.status === 500) {
                errorMessage = 'Server error. Please try again later.';
            }
        } else if (err.message === 'Network Error') {
            errorMessage = 'Network error. Please check your internet connection.';
        }

        setError(errorMessage);
        return { success: false, message: errorMessage };
    } finally {
        setLoading(false);
    }
};

const verifyOtpForPasswordReset = async (email, otp) => {
    setLoading(true);
    setError(null);

    try {
        const response = await axios.post(`${API_BASE_URL}/api/verify-otp-for-reset`, { email, otp });

        if (response.status === 200) {
            setIsOtpVerified(true);
            return { success: true, data: response.data };
        } else {
            const errorMessage = response.data.message || 'Failed to verify OTP. Please try again.';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    } catch (err) {
        let errorMessage = 'An unexpected error occurred. Please try again.';

        if (err.response) {
            if (err.response.status === 400) {
                errorMessage = err.response.data?.message || 'Invalid OTP. Please check and try again.';
            } else if (err.response.status === 500) {
                errorMessage = 'Server error. Please try again later.';
            }
        } else if (err.message === 'Network Error') {
            errorMessage = 'Network error. Please check your internet connection.';
        }

        setError(errorMessage);
        return { success: false, message: errorMessage };
    } finally {
        setLoading(false);
    }
};

const resetPassword = async (data) => {
    setLoading(true);
    setError(null);

    try {
        const response = await axios.post(`${API_BASE_URL}/api/reset-password`, data);

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            const errorMessage = response.data.message || 'Failed to reset password. Please try again.';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    } catch (err) {
        let errorMessage = 'An unexpected error occurred. Please try again.';

        if (err.response) {
            if (err.response.status === 400) {
                errorMessage = err.response.data?.message || 'Invalid request. Please check your input.';
            } else if (err.response.status === 500) {
                errorMessage = 'Server error. Please try again later.';
            }
        } else if (err.message === 'Network Error') {
            errorMessage = 'Network error. Please check your internet connection.';
        }

        setError(errorMessage);
        return { success: false, message: errorMessage };
    } finally {
        setLoading(false);
    }
};

const resendForgetPasswordOtp = async (email) => {
    setLoading(true);
    setError(null);

    try {
        const response = await axios.post(`${API_BASE_URL}/api/forgot-password`, { email });

        if (response.status === 200) {
            setIsTimerActive(true);
            setTimer(180); // Start a 3-minute timer
            return { success: true };
        } else {
            const errorMessage = response.data.message || 'Failed to resend OTP. Please try again.';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    } catch (err) {
        let errorMessage = 'An unexpected error occurred. Please try again.';

        if (err.response) {
            if (err.response.status === 400) {
                errorMessage = err.response.data?.message || 'Invalid request. Please check your input.';
            } else if (err.response.status === 500) {
                errorMessage = 'Server error. Please try again later.';
            }
        } else if (err.message === 'Network Error') {
            errorMessage = 'Network error. Please check your internet connection.';
        }

        setError(errorMessage);
        return { success: false, message: errorMessage };
    } finally {
        setLoading(false);
    }
};


  const contactUs = async (contactData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact-us`, contactData);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err) => {
    if (axios.isAxiosError(err)) {
      console.error('Network Error Details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers,
      });
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } else {
      console.error('Unexpected Error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isOtpSent && isTimerActive) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
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

  return {
    signIn,
    signUp,
    setOtp,
    sendOtp,
    contactUs,
    resendOtp,
    verifyOtp,
    chunkArray,
    formatTime,
    verifyOtpForPasswordReset,
    resetPassword,
    resendForgetPasswordOtp,
    setResponse,
    setFormError,
    setBackendError,
    error,
    loading,
    response,
    isOtpSent,
    isOtpVerified,
    isTimerActive,
    formError,
    backendError,
    otp,
    timer,
    setLoading, // Exposing setLoading here
    setError,   // Exposing setError here
  };
};
