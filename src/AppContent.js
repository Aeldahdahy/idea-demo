import React, { useEffect }  from 'react'; //{ useState }
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import NavBar from './component/Navbar';
import Footer from './component/Footer';
import CopyRight from './component/CopyRight';
import Home from './component/Home'; 
import SingOptions from './component/SingOptions';
// import PopUpSignInForm from './component/PopUpSignInForm';

function Invest() {
  return <h2>Invest Page</h2>;
}

function Fundraise() {
  return <h2>Fundraise Page</h2>;
}

function Stories() {
  return <h2>Stories Page</h2>;
}

function AboutUs() {
  return <h2>About Us Page</h2>;
}

function ContactUs() {
  return <h2>Contact Us Page</h2>;
}

function AppContent() {
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavAndFooter = location.pathname === '/signup&signin';
  const isAuthenticated = !!localStorage.getItem('authToken');

  useEffect(() => {
    if (location.pathname === '/signup&signin' && isAuthenticated) {
      navigate('/'); // Redirect authenticated users away from the sign-in page
    }
  }, [location, isAuthenticated, navigate]);

  // const openPopup = () => {
  //   setIsPopupOpen(true);
  // };

  // const closePopup = () => {
  //   setIsPopupOpen(false);
  // };

  return (
    <>
      {!hideNavAndFooter && <NavBar />} {/*onSignInClick={openPopup}*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/fundraise" element={<Fundraise />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup&signin" element={isAuthenticated ? <navigate to='/' /> : <SingOptions  />} /> {/*onClick={closePopup}*/}
      </Routes>
      {!hideNavAndFooter && <Footer />}
      <CopyRight />
      {/* {isPopupOpen && <PopUpSignInForm onClose={closePopup} />} */}
    </>
  );
}

export default AppContent;
