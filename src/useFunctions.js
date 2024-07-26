import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFunctions = () => {
  const [isFixed, setIsFixed] = useState(false); // State for fixed header
  const [isVisible, setIsVisible] = useState(true); // State for header visibility
  const [sideBarVisible, setSideBarVisible] = useState(false); // State for sidebar visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('En');
  const [searchTerm, setSearchTerm] = useState('');
  const [paragraphText, setParagraphText] = useState('');
  const [subText, setSubText] = useState('');
  const [stories, setStories] = useState([]); // State for success stories
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

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

  useEffect(()=>{
    const fetchText = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:2000/api/whoarewe");
        setParagraphText(response.data.mainText);
        setSubText(response.data.subText);
      } catch (error) {
        console.log("Error Fetching the Paragraph", error);
      }
    };
    fetchText();
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:2000/api/successstories');
        setStories(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const signUp = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Send OTP
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
      await axios.post('http://127.0.0.1:2000/api/signup', { email });
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  return { 
    toggleSideBar,
    toggleDropdown,
    selectLanguage,
    handleInputChange,
    handleSearch,
    chunkArray,
    signUp,
    verifyOtp,
    resendOtp,
    setOtp,
    isFixed,
    isVisible,
    sideBarVisible,
    dropdownVisible,
    currentLanguage,
    paragraphText,
    subText,
    stories,
    loading,
    error,
    isOtpSent,
    otp,
  };
};
