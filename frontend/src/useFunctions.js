import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwtDecode
import { useDispatch } from 'react-redux';
import { login, logout } from './redux/authSlice';

export const useFunctions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFixed, setIsFixed] = useState(false); // State for fixed header
  const [isVisible, setIsVisible] = useState(true); // State for header visibility
  const [sideBarVisible, setSideBarVisible] = useState(false); // State for sidebar visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('En');
  const [searchTerm, setSearchTerm] = useState('');
  // const [paragraphText, setParagraphText] = useState('');
  // const [subText, setSubText] = useState('');
  // const [stories, setStories] = useState([]); 
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(180); 
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [response, setResponse] = useState(null); // Initialize response as null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Initialize error as null
  const [formError, setFormError] = useState({});
  const [backendError, setBackendError] = useState(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false); // Hide header on scroll down
        } else {
          setIsVisible(true); // Show header on scroll up
        }
        setIsFixed(true); // Fix header after scrolling past 50px
      } else {
        setIsFixed(false); // Unfix header if scrolled to top
        setIsVisible(true); // Always show header when at the top
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Only run once on component mount

  const toggleSideBar = () => {
    setSideBarVisible(prevState => !prevState); // Toggle sidebar visibility
  };

  const toggleDropdown = () => {
    setDropdownVisible(prevState => !prevState);
  };

  const selectLanguage = (language) => {
    setCurrentLanguage(language);
    setDropdownVisible(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log('Search term:', searchTerm);
    // Add your search logic here
  };

  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  // Who are we
  // useEffect(() => {
  //   const fetchText = async () => {
  //     try {
  //       const response = await axios.get("http://127.0.0.1:7030/api/whoarewe");
  //       setParagraphText(response.data.mainText);
  //       setSubText(response.data.subText);
  //     } catch (error) {
  //       console.log("Error Fetching the Paragraph", error);
  //     }
  //   };
  //   fetchText();
  // }, []);

  // Success stories
  // useEffect(() => {
  //   const fetchStories = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:7030/api/successstories');
  //       setStories(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.response?.data?.message || 'An error occurred while fetching stories.');
  //       setLoading(false);
  //     }
  //   };
  //   fetchStories();
  // }, []);

  // Sign Up
  
  
  const signUp = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Send OTP
      const otpResponse = await axios.post('http://127.0.0.1:7030/api/signup', { email: formData.email });
      
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
      const verifyResponse = await axios.post('http://127.0.0.1:7030/api/verify-otp', {
        email: formData.email,
        otp,
        role: formData.role,
        fullName: formData.fullName,
        password: formData.password,
      });

      if (verifyResponse.status === 201) {
        setIsOtpVerified(true);
        return verifyResponse.data;
      } else if (verifyResponse.status === 400 || verifyResponse.status === 500) {
        setError(verifyResponse.data.message || 'An error occurred. Please try again.');
      } else {
        throw verifyResponse.data;
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
      await axios.post('http://127.0.0.1:7030/api/signup', { email });
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

  const setTokenExpiration = () => {
    setTimeout(() => {
      dispatch(logout());
      navigate('/');
    }, 18000000); // 5 hour in milliseconds
  };

  // Sign In
  const signIn = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:7030/api/signin', {
        email: formData.email,
        password: formData.password,
      });
  
      
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
  
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
  
        if (decodedToken && decodedToken.user) {
          localStorage.setItem('userFullName', decodedToken.user.fullName);
          localStorage.setItem('hasAccessedPortal', 'true'); // Set the portal access flag
          localStorage.setItem('portalType', 'client'); // Store the portal type
  
          dispatch(login({ token, role: 'client' }));
          setTokenExpiration();
          navigate('/client-portal/');
          return response.data;
        } else {
          throw new Error('Unexpected token structure');
        }
      } else {
        setError('Sign-in failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || `An error occurred. Please try again. ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const StaffSignIn = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:7030/api/staff/login', {
        username: formData.username,
        password: formData.password,
      });
  
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
  
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
  
        if (decodedToken && decodedToken.id) {
          localStorage.setItem('userId', decodedToken.id);
          localStorage.setItem('userName', decodedToken.username);
          localStorage.setItem('userRole', decodedToken.role);
          localStorage.setItem('hasAccessedPortal', 'true');
          localStorage.setItem('portalType', 'employee'); 
  
          dispatch(login({ token, role: 'employee' }));
          setTokenExpiration();
          navigate('/employee-portal/');
          return response.data;
        } else {
          throw new Error('Unexpected token structure');
        }
      } else {
        setError('Sign-in failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || `An error occurred. Please try again. ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  
  const sendOtp = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:7030/api/forgot-password', { email });
      if (response.status === 200) {
        setIsOtpSent(true);
        return response.data;
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpForPasswordReset = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:7030/api/verify-otp-for-reset', { email, otp });
      if (response.status === 200) {
        setIsOtpVerified(true);
        return response.data;
      } else {
        throw new Error('Failed to verify OTP');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const resetPassword = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:7030/api/reset-password', data);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (err) {
      console.error('Error resetting password:', err); // Log the error for debugging
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const resendForgetPasswordOtp = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('http://127.0.0.1:7030/api/forgot-password', { email });
      setIsTimerActive(true);
      setTimer(180);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // sign out
  const signOutDistroySession = async () =>{
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:7030/api/signout');
      console.log(response.data);

      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userFullName');
      localStorage.removeItem('username');
      localStorage.removeItem('hasAccessedPortal'); // Remove portal access flag
      dispatch(logout());
      // Redirect the user to the main route
      navigate('/'); // Ensure this points to the correct main route
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. please try again later.');
    }finally{
      setLoading(false);
    }
  };

  // contact us
  const contactUs = async (formData) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const contactResponse = await axios.post('http://127.0.0.1:7030/api/contact', {
        fullname: formData.fullname,
        email: formData.email,
        message: formData.message
      });

      if (contactResponse.status === 201) {
        setResponse(contactResponse.data.message || 'Your message has been sent successfully.');
      } else {
        setResponse(contactResponse.data.message || 'There was an issue sending your message. Please try again later.');
      }

    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        setError(error.response.data.message || 'There was an error sending your message. Please check your input and try again.');
      } else if (error.request) {
        // Request was made but no response received
        setError('No response received from the server. Please check your internet connection and try again.');
      } else {
        // Something else caused an error
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const validate = (formType, name, value, formData) => {
    let errors = { ...formError };
  
    switch (name) {
      case 'email': {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errors.email = 'E-mail is required.';
        } else if (!emailPattern.test(value)) {
          errors.email = 'Email must be formatted correctly.';
        } else {
          delete errors.email;
        }
        break;
      }
      case 'password': {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if (!value) {
          errors.password = 'Password is required.';
        } else if (!passwordPattern.test(value) && (formType === "resetPassword" || formType === 'signup')) {
          errors.password = 'Password must be at least 6 characters long and contain at least one lower and upper character, one number, and one symbol.';
        } else {
          delete errors.password;
        }
        break;
      }
      case 'confirmPassword': {
        if (!value) {
          errors.confirmPassword = 'Confirm Password is required.';
        } else if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match.';
        } else {
          delete errors.confirmPassword;
        }
        break;
      }
      case 'newPassword': {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if (formType === 'resetPassword') {
          if (!value) {
            errors.newPassword = 'New Password is required.';
          } else if (!passwordPattern.test(value)) {
            errors.newPassword = 'Password must be at least 6 characters long and contain at least one lower and upper character, one number, and one symbol.';
          } else {
            delete errors.newPassword;
          }
        }
        break;
      }
      default:
        break;
    }
  
    setFormError(errors);
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
    setError,
    validate,
    contactUs,
    resendOtp,
    verifyOtp,
    chunkArray,
    formatTime,
    StaffSignIn,
    handleSearch,
    setFormError,
    resetPassword,
    toggleSideBar,
    toggleDropdown,
    selectLanguage,
    setBackendError,
    handleInputChange,
    signOutDistroySession,
    resendForgetPasswordOtp,
    verifyOtpForPasswordReset,
    otp,
    timer,
    error,
    isFixed,
    isVisible,
    sideBarVisible,
    dropdownVisible,
    currentLanguage,
    // paragraphText,
    // subText,
    // stories,
    loading,
    response,
    isOtpSent,
    isOtpVerified,
    isTimerActive,
    formError,
    backendError,
  };
};
