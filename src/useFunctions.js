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
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null);


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
            try{
                const response = await axios.get("http://127.0.0.1:2000/api/whoarewe");
                setParagraphText(response.data.mainText);
                setSubText(response.data.subText);
            }catch (error) {
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

// sign up 
const signUp = async (formData) => {
  setLoading(true);
  setError(null);
  try {
    // Step 1: Send OTP
    const otpResponse = await axios.post('http://127.0.0.1:2000/api/signup', { email: formData.email });

    if (otpResponse.status === 200) {
      // Step 2: Verify OTP and complete signup
      const otp = prompt("Enter the OTP sent to your email");
      const verifyResponse = await axios.post('http://127.0.0.1:2000/api/verify-otp', {
        email: formData.email,
        otp,
        role: formData.role,
        fullName: formData.fullName,
        password: formData.password,
      });

      if (verifyResponse.status === 201) {
        // User registered successfully
        return verifyResponse.data;
      } else {
        throw verifyResponse.data;
      }
    } else {
      throw otpResponse.data;
    }
  } catch (err) {
    setError(err);
    throw err;
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
   };
};
