import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwtDecode
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/authSlice';
import { setUsers } from './redux/userSlice';
import { setMessages } from './redux/messagesSlice';
import { setStaff } from './redux/staffSlice';
import { setProject } from './redux/projectSlice';
import { toast } from 'react-toastify';

export const useFunctions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, lastUserFetched } = useSelector(state => state.users);
  const { messages, lastMessageFetched } = useSelector(state => state.messages);
  const { staff, lastStaffFetched } = useSelector(state => state.staff);
  const { project, lastProjectFetched } = useSelector(state => state.project);

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

  
  
  // Sign Up
  const signUp = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Send OTP
      const otpResponse = await axios.post('http://127.0.0.1:7030/api/signup', { email: formData.email });
  
      if (otpResponse.status === 200) {
        setIsOtpSent(true);
        toast.success('OTP sent successfully!');
        return otpResponse.data;
      } else {
        throw otpResponse.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
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
        toast.success('OTP verified successfully!');
        return verifyResponse.data;
      } else if (verifyResponse.status === 400 || verifyResponse.status === 500) {
        const errorMessage = verifyResponse.data.message || 'An error occurred. Please try again.';
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        throw verifyResponse.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
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
      toast.success('OTP resent successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
        if (decodedToken.user.status === 'Inactive') {
          setLoading(false);
          throw new Error('This account has been deactivated!');
        }
        console.log('Decoded Token:', decodedToken, response.data);
  
        if (decodedToken && decodedToken.user) {
          localStorage.setItem('userFullName', decodedToken.user.fullName);
          localStorage.setItem('hasAccessedPortal', 'true'); // Set the portal access flag
          localStorage.setItem('portalType', 'client'); // Store the portal type
  
          dispatch(login({ token, role: 'client' }));
          setTokenExpiration();
          navigate('/client-portal/');
          toast.success('Login successfully!');
          return response.data;
        } else {
          throw new Error('Unexpected token structure');
        }
      } else {
        const errorMessage = 'Sign-in failed. Please try again.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || `An error occurred. Please try again. ${err.message}`;
      setError(errorMessage);
      toast.error(errorMessage);
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
          toast.success('Login successfully!');
          return response.data;
        } else {
          const errorMessage = 'Sign-in failed. Please try again.';
          toast.error(errorMessage);
        }
      } else {
        const errorMessage = 'Sign-in failed. Please try again.';
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || `An error occurred. Please try again. ${err.message}`;
      toast.error(errorMessage);
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
        toast.success('OTP sent successfully!');
        return response.data;
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
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
        toast.success('OTP verified successfully!');
        return response.data;
      } else {
        throw new Error('Failed to verify OTP');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
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
        toast.success('Password reset successfully!');
        return response.data;
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (err) {
      console.error('Error resetting password:', err); // Log the error for debugging
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
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
      toast.success('OTP resent successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  // sign out
  const signOutDistroySession = async () => {
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
      toast.success('Signed out successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. please try again later.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
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
        const successMessage = contactResponse.data.message || 'Your message has been sent successfully.';
        setResponse(successMessage);
        toast.success(successMessage);
      } else {
        const errorMessage = contactResponse.data.message || 'There was an issue sending your message. Please try again later.';
        setResponse(errorMessage);
        toast.error(errorMessage);
      }
  
    } catch (error) {
      let errorMessage;
      if (error.response) {
        // Server responded with a status other than 2xx
        errorMessage = error.response.data.message || 'There was an error sending your message. Please check your input and try again.';
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response received from the server. Please check your internet connection and try again.';
      } else {
        // Something else caused an error
        errorMessage = `Error: ${error.message}`;
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  // get all users
  const getAllUsers = useCallback(async () => {
    const THIRTY_MINUTES = 30 * 60 * 1000;
    const now = Date.now();
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      const errorMessage = 'Authentication token is missing. Please sign in again.';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }
  
    if (lastUserFetched && now - lastUserFetched < THIRTY_MINUTES) {
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get('http://127.0.0.1:7030/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // console.log("API Response:", response.data);
  
      if (Array.isArray(response.data.data)) {
        dispatch(setUsers(response.data.data));
        toast.success('Users fetched successfully!');
      } else {
        throw new Error('Invalid data format: Expected an array in response.data.data');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while fetching users.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [lastUserFetched, dispatch]);

  // update users
  const updateUsers = async (id, status) => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    const newStatus = status === "Active" ? "Inactive" : "Active";
  
    // Optimistically update the user status in the UI
    dispatch(setUsers(users.map(user => user._id === id ? { ...user, status: newStatus } : user)));
  
    try {
      const response = await axios.put(
        `http://127.0.0.1:7030/api/users/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      if (response.status !== 200) {
        throw new Error('Failed to update user');
      }
      toast.success('User status updated successfully!');
    } catch (err) {
      // Revert the status change if the API call fails
      dispatch(setUsers(users.map(user => user._id === id ? { ...user, status } : user)));
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // get all messages
  const getAllMessages = useCallback(async () => {
    const THIRTY_MINUTES = 30 * 60 * 1000;
    const now = Date.now();
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      const errorMessage = 'Authentication token is missing. Please sign in again.';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }
  
    if (lastMessageFetched && now - lastMessageFetched < THIRTY_MINUTES) {
      return;
    }
  
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:7030/api/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // console.log("API Response:", response.data);
  
      if (Array.isArray(response.data.data)) {
        dispatch(setMessages(response.data.data)); // Dispatch setMessages action
        toast.success('Messages fetched successfully!');
      } else {
        throw new Error('Invalid data format: Expected an array in response.data.data');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while fetching messages.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [lastMessageFetched, dispatch]);
  
  const updateMessages = async (id, status) => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    const newStatus = status === "Pending" ? "Replied" : "Pending";
  
    // Optimistically update the message status in the UI
    dispatch(setMessages(messages.map(message => message._id === id ? { ...message, status: newStatus } : message)));
  
    try {
      const response = await axios.put(
        `http://127.0.0.1:7030/api/contacts/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        });
      if (response.status !== 200) {
        throw new Error('Failed to update message');
      }
      toast.success('Message status updated successfully!');
    } catch (err) {
      // Revert the status change if the API call fails
      dispatch(setMessages(messages.map(message => message._id === id ? { ...message, status } : message)));
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // get all staff
  const getAllStaff = useCallback(async () => {
    const THIRTY_MINUTES = 30 * 60 * 1000;
    const now = Date.now();
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      const errorMessage = 'Authentication token is missing. Please sign in again.';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }
  
    if (lastStaffFetched && now - lastStaffFetched < THIRTY_MINUTES) {
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:7030/api/staff', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.data);
      
      if (Array.isArray(response.data.data)) {
        dispatch(setStaff(response.data.data));
        toast.success('Staff fetched successfully!');
      } else {
        throw new Error('Invalid data format: Expected an array in response.data');
      }
  
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while fetching staff.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [lastStaffFetched, dispatch]);

  // update staff
  const updateStaff = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
  
    // Optimistically update the staff status in the UI
    dispatch(setStaff(staff.map(staff => staff._id === id ? { ...staff, ...updatedData } : staff)));
  
    try {
      const response = await axios.put(`http://127.0.0.1:7030/api/staff/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status !== 200) {
        throw new Error('Failed to update staff');
      }
      toast.success('Staff data updated successfully!');
    } catch (err) {
      // Revert the status change if the API call fails
      dispatch(setStaff(staff.map(staff => staff._id === id ? { ...staff, ...updatedData } : staff)));
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createStaff = async (formData) => {
    setLoading(true);
    setError(null);
    try{
      const response = await axios.post('http://127.0.0.1:7030/api/staff', formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        }
      );

      if(response.status === 201){
        toast.success('Staff created successfully!');
        return response.data;
      }

    }catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

// get all projects
const getAllProjects = useCallback(async () => {
  const THIRTY_MINUTES = 30 * 60 * 1000;
  const now = Date.now();
  const token = localStorage.getItem('authToken');

  if (!token) {
    const errorMessage = 'Authentication token is missing. Please sign in again.';
    setError(errorMessage);
    toast.error(errorMessage);
    return;
  }

  if (lastProjectFetched && now - lastProjectFetched < THIRTY_MINUTES) {
    return;
  }

  setLoading(true);
  setError(null);
  try {
    const response = await axios.get('http://127.0.0.1:7030/api/projects', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data.data);

    if (Array.isArray(response.data.data)) {
      dispatch(setProject(response.data.data));
      toast.success('Projects fetched successfully!');
    } else {
      throw new Error('Invalid data format: Expected an array in response.data');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred while fetching projects.';
    setError(errorMessage);
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
}, [lastProjectFetched, dispatch]);

// update project
const updateProject = async (id, updatedData) => {
  setLoading(true);
  setError(null);
  const authToken = localStorage.getItem('authToken');

  dispatch(setProject(project.map(proj => proj._id === id ? { ...proj, ...updatedData } : proj)));

  try {
    const response = await axios.put(`http://127.0.0.1:7030/api/projects/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (response.status !== 200) {
      throw new Error('Failed to update project');
    }
    toast.success('Project data updated successfully!');
  } catch (err) {
    dispatch(setProject(project.map(proj => proj._id === id ? { ...proj, ...updatedData } : proj)));
    const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
    setError(errorMessage);
    toast.error(errorMessage);
    throw err;
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
    createStaff,
    updateUsers,
    getAllUsers,
    getAllStaff,
    updateStaff,
    StaffSignIn,
    handleSearch,
    setFormError,
    resetPassword,
    updateProject,
    toggleSideBar,
    getAllProjects,
    updateMessages,
    toggleDropdown,
    selectLanguage,
    getAllMessages,
    setBackendError,
    handleInputChange,
    signOutDistroySession,
    resendForgetPasswordOtp,
    verifyOtpForPasswordReset,
    otp,
    timer,
    users,
    staff,
    error,
    isFixed,
    messages,
    project,
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
