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
import { setClientAuth } from './redux/clientAuthSlice'; // Import the action to set client auth data
import { toast } from 'react-toastify';
import { updateClientData } from './redux/clientAuthSlice'; // Import the action to update client data


export const useFunctions = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
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
  //       const response = await axios.get(`${API_BASE_URL}/api/whoarewe`);
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
  //       const response = await axios.get(`${API_BASE_URL}/api/successstories`);
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
      const otpResponse = await axios.post(`${API_BASE_URL}/api/signup`, { email: formData.email });
  
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

  // update users
  const updateUsers = async (id, updatedData, imageFile) => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
  
    // Validate id
    if (!id || typeof id !== 'string' || id.trim() === '') {
      const errorMessage = 'Invalid or missing user ID';
      setError(errorMessage);
      setLoading(false);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  
    // Validate investorPreference
    if (updatedData.role === 'investor' && updatedData.investorPreference) {
      const { investorType, minInvestment, maxInvestment, yearsOfExperience, socialAccounts, country, city, industries } = updatedData.investorPreference;
      if (!['individual', 'company'].includes(investorType)) {
        const errorMessage = 'Investor type must be either "individual" or "company"';
        setError(errorMessage);
        setLoading(false);
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
      const minInvest = Number(minInvestment);
      const maxInvest = Number(maxInvestment);
      if (isNaN(minInvest) || isNaN(maxInvest) || minInvest < 0 || maxInvest > 1000000 || maxInvest < minInvest) {
        const errorMessage = 'Invalid investment range';
        setError(errorMessage);
        setLoading(false);
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
      if (!['0-1', '1-3', '3-5', '5+'].includes(yearsOfExperience)) {
        const errorMessage = 'Invalid years of experience';
        setError(errorMessage);
        setLoading(false);
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
      const validSocialAccounts = Array.isArray(socialAccounts) ? socialAccounts.filter(account => account.trim() !== '') : [];
      if (validSocialAccounts.length === 0) {
        const errorMessage = 'At least one social account is required';
        setError(errorMessage);
        setLoading(false);
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
      if (!country || !city) {
        const errorMessage = 'Country and city are required';
        setError(errorMessage);
        setLoading(false);
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
      if (!Array.isArray(industries) || industries.length !== 3) {
        const errorMessage = 'Exactly 3 industries must be selected';
        setError(errorMessage);
        setLoading(false);
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    }
  
    // Optimistically update the user in the UI
    const optimisticData = {
      ...updatedData,
      image: imageFile ? URL.createObjectURL(imageFile) : updatedData.image || null,
      ...(updatedData.investorPreference && updatedData.role === 'investor' ? {
        firstLogin: false,
        investorPreference: updatedData.investorPreference
      } : updatedData.role === 'entrepreneur' ? {
        investorPreference: null
      } : {})
    };
  
    dispatch(
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, ...optimisticData } : user
        )
      )
    );
  
    try {
      const formData = new FormData();
      // Append standard user fields if provided
      if (updatedData.fullName) formData.append('fullName', updatedData.fullName);
      if (updatedData.email) formData.append('email', updatedData.email);
      if (updatedData.phone) formData.append('phone', updatedData.phone);
      if (updatedData.address) formData.append('address', updatedData.address);
      if (updatedData.date_of_birth) formData.append('date_of_birth', updatedData.date_of_birth);
      if (updatedData.role) formData.append('role', updatedData.role);
      if (updatedData.national_id) formData.append('national_id', updatedData.national_id);
      if (updatedData.education) formData.append('education', updatedData.education);
      if (updatedData.experience) formData.append('experience', updatedData.experience);
      if (updatedData.biography) formData.append('biography', updatedData.biography);
      if (updatedData.status) formData.append('status', updatedData.status);
  
      // Append investorPreference for investors
      if (updatedData.investorPreference && updatedData.role === 'investor') {
        formData.append('investorPreference', JSON.stringify(updatedData.investorPreference));
        formData.append('firstLogin', 'false');
      }
  
      // Append image file if present
      if (imageFile) {
        formData.append('image', imageFile);
      }
  
      const response = await axios.patch(`${API_BASE_URL}/api/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('updateUsers API response:', response.data);
  
      if (response.status !== 200) {
        throw new Error('Failed to update user');
      }
  
      // Validate response data
      const backendData = response.data.data;
      if (!backendData || !backendData.id || !backendData.role) {
        throw new Error('Invalid response data from server');
      }
  
      // Construct clientData with fallback for clientRole
      const clientData = {
        ...backendData,
        clientRole: backendData.clientRole || (backendData.role ? backendData.role.charAt(0).toUpperCase() + backendData.role.slice(1) : 'Investor'),
        firstLogin: backendData.firstLogin ?? false // Fallback to false if undefined
      };
  
      console.log('Dispatching clientData:', clientData);
  
      // Update Redux with the server response
      dispatch(
        setUsers(
          users.map((user) => (user._id === id ? clientData : user))
        )
      );
  
      // Update clientAuth.clientData
      dispatch(updateClientData(clientData));
  
      toast.success('User updated successfully!');
      return response.data;
    } catch (err) {
      // Revert the user data if the API call fails
      dispatch(setUsers(users));
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      console.error('updateUsers error:', errorMessage);
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
      const verifyResponse = await axios.post(`${API_BASE_URL}/api/verify-otp`, {
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
      await axios.post(`${API_BASE_URL}/api/signup`, { email });
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

  const signIn = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/signin`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        if (!token || !user) {
          throw new Error('Invalid API response: Missing token or user data');
        }

        // Store token in localStorage
        localStorage.setItem('authToken', token);

        // Decode token (optional, since user data is provided in response)
        // const decodedToken = jwtDecode(token);

        // Validate user status
        if (user.status === 'Inactive') {
          setLoading(false);
          throw new Error('This account has been deactivated!');
        }

        // Use clientRole from response (already normalized by backend)
        const clientRole = user.clientRole;
        if (!['Investor', 'Entrepreneur'].includes(clientRole)) {
          throw new Error(`Invalid client role: ${clientRole}`);
        }

        // Store additional data in localStorage
        localStorage.setItem('username', user.fullName || 'Unknown User');
        localStorage.setItem('hasAccessedPortal', 'true');
        localStorage.setItem('portalType', 'client');

        // Dispatch authSlice login action
        dispatch(login({
          token,
          role: 'client',
          username: user.fullName || 'Unknown User',
        }));

        // Dispatch clientAuthSlice setClientAuth action
        dispatch(setClientAuth({
          clientData: {
            _id: user.id,
            fullName: user.fullName || null,
            clientRole: user.clientRole, // Use backend-normalized clientRole
            email: user.email || null,
            phone: user.phone || null,
            address: user.address || null,
            biography: user.biography || null,
            date_of_birth: user.date_of_birth || null,
            education: user.education || null,
            experience: user.experience || null,
            national_id: user.national_id || null,
            image: user.image || null,
            status: user.status || null,
            firstLogin: user.firstLogin ?? null,
            investorPreference: user.investorPreference || null
          }
        }));

        // Set token expiration
        setTokenExpiration();

        // Redirect based on role (ClientInvestorHome handles firstLogin redirect)
        const redirectPath = clientRole === 'Investor' ? '/client-portal/investor' : '/client-portal/entrepreneur';
        navigate(redirectPath);
        toast.success('Login successful!');
        return response.data;
      } else {
        const errorMessage = 'Sign-in failed. Please try again.';
        setError(errorMessage);
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      const errorMessage = err.response?.data?.message || `An error occurred: ${err.message}`;
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
      const response = await axios.post(`${API_BASE_URL}/api/staff/login`, {
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
      const response = await axios.post(`${API_BASE_URL}/api/forgot-password`, { email });
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
      const response = await axios.post(`${API_BASE_URL}/api/verify-otp-for-reset`, { email, otp });
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
      const response = await axios.post(`${API_BASE_URL}/api/reset-password`, data);
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
      await axios.post(`${API_BASE_URL}/api/forgot-password`, { email });
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
      const response = await axios.post(`${API_BASE_URL}/api/signout`);
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
      const contactResponse = await axios.post(`${API_BASE_URL}/api/contact`, {
        fullname: formData.fullname,
        email: formData.email,
        message: formData.message
      });
  
      if (contactResponse.status === 201) {
        const successMessage = contactResponse.data.message || 'Your message has been sent successfully.';
        setResponse(successMessage);
        // toast.success(successMessage);
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
      const response = await axios.get(`${API_BASE_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // console.log("API Response:", response.data);
  
      if (Array.isArray(response.data.data)) {
        dispatch(setUsers(response.data.data));
        // toast.success('Users fetched successfully!');
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
  }, [API_BASE_URL, lastUserFetched, dispatch]);


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
      const response = await axios.get(`${API_BASE_URL}/api/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // console.log("API Response:", response.data);
  
      if (Array.isArray(response.data.data)) {
        dispatch(setMessages(response.data.data)); 
        // toast.success('Messages fetched successfully!');
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
  }, [API_BASE_URL, lastMessageFetched, dispatch]);
  
  const updateMessages = async (id, status) => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    const newStatus = status === "Pending" ? "Replied" : "Pending";
  
    // Optimistically update the message status in the UI
    dispatch(setMessages(messages.map(message => message._id === id ? { ...message, status: newStatus } : message)));
  
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/contacts/${id}/status`,
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
      const response = await axios.get(`${API_BASE_URL}/api/staff`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response.data.data);
      
      if (Array.isArray(response.data.data)) {
        dispatch(setStaff(response.data.data));
        // toast.success('Staff fetched successfully!');
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
  }, [API_BASE_URL, lastStaffFetched, dispatch]);

  //create staff
  const createStaff = async (updatedData) => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/staff`, updatedData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status !== 201) {
        throw new Error('Failed to create staff');
      }
      dispatch(setStaff([...staff, response.data.data]));
      toast.success('Staff created successfully!');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // update staff
  const updateStaff = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');

    // Optimistically update the staff status in the UI
    const updatedDataObject = {};
    updatedData.forEach((value, key) => {
      if (key === 'permissions') {
        try {
          updatedDataObject[key] = JSON.parse(value);
        } catch (error) {
          console.error('Error parsing permissions in optimistic update:', error);
          updatedDataObject[key] = [];
        }
      } else {
        updatedDataObject[key] = value;
      }
    });

    dispatch(
      setStaff(
        staff.map((s) =>
          s._id === id ? { ...s, ...updatedDataObject, image: s.image } : s
        )
      )
    );

    try {
      const response = await axios.put(`${API_BASE_URL}/api/staff/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to update staff');
      }
      dispatch(
        setStaff(
          staff.map((s) =>
            s._id === id ? { ...s, ...response.data.data } : s
          )
        )
      );
      toast.success('Staff data updated successfully!');
      return response.data;
    } catch (err) {
      dispatch(
        setStaff(
          staff.map((s) =>
            s._id === id ? { ...s, ...updatedDataObject, image: s.image } : s
          )
        )
      );
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllProjectsBeforeAuth = async () => {

    try {
      const response = await axios.get(`${API_BASE_URL}/api/projectBeforLogin`);
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while fetching projects.';
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
      const response = await axios.get(`${API_BASE_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response.data.data);

      if (Array.isArray(response.data.data)) {
        dispatch(setProject(response.data.data));
        // toast.success('Projects fetched successfully!');
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
  }, [API_BASE_URL, lastProjectFetched, dispatch]);

    // get a single project by ID
    const getProjectById = useCallback(async (projectId) => {
      const token = localStorage.getItem('authToken');
  
      if (!token) {
        const errorMessage = 'Authentication token is missing. Please sign in again.';
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      }
  
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.data.data) {
          return response.data.data; // Return the project data
        } else {
          throw new Error('Invalid data format: Expected project data in response.data');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fetching the project.';
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    }, [API_BASE_URL]);

  // update project
  const updateProject = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');

    dispatch(setProject(project.map(proj => proj._id === id ? { ...proj, ...updatedData } : proj)));

    try {
      const response = await axios.put(`${API_BASE_URL}/api/projects/${id}`, updatedData, {
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

  // create meeting
  const createMeeting = async (meetingData) => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');

    // Log the request details for debugging
    console.log('Creating meeting with data:', meetingData);
    console.log('Request URL:', `${API_BASE_URL}/api/create-meeting`);
    console.log('Auth Token:', authToken);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/create-meeting`, meetingData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status !== 201) {
        throw new Error('Failed to create meeting');
      }
      toast.success('Meeting created successfully!');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      console.error('Create meeting error:', err.response?.data || err);
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // cancel meeting
  const cancelMeeting = async (meetingId) => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/cancel-meeting/${meetingId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status !== 200) {
        throw new Error('Failed to cancel meeting');
      }
      toast.success('Meeting canceled successfully!');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred while canceling the meeting.';
      console.error('Cancel meeting error:', err.response?.data || err);
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // get meeting status
  const checkMeetingStatus = async (projectId, investorId, entrepreneurId) => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    try {
      // Construct the URL using path parameters
      const url = `${API_BASE_URL}/api/meeting/status/${projectId}/${investorId}/${entrepreneurId}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      console.log('Meeting status:', response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to check meeting status.';
      console.error('Check meeting status error: ', err.response?.data, errorMessage || err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/projects`, projectData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status !== 201) {
        throw new Error('Failed to create project');
      }
      toast.success('Project created successfully!');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      console.error('Create project error:', err.response?.data || err);
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
    cancelMeeting,
    updateProject,
    toggleSideBar,
    createMeeting,
    createProject,
    getAllProjects,
    updateMessages,
    toggleDropdown,
    selectLanguage,
    getAllMessages,
    getProjectById,
    setBackendError,
    handleInputChange,
    checkMeetingStatus,
    signOutDistroySession,
    resendForgetPasswordOtp,
    getAllProjectsBeforeAuth,
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
    API_BASE_URL,
  };
};
