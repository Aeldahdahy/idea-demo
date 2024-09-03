import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import NavBar from './component/Navbar';
import Footer from './component/Footer';
import CopyRight from './component/CopyRight';
import Home from './component/Home';
import Contact from './component/Contact';
import EmployeePortal from './component/EmployeePortal';
import ClientPortal from './component/ClientPortal';

function Invest() {
  return <h2>Invest Page</h2>;
}

function Fundraising() {
  return <h2>Fundraising Page</h2>;
}

function Stories() {
  return <h2>Stories Page</h2>;
}

function AboutUs() {
  return <h2>About Us Page</h2>;
}

function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasAccessedPortal = localStorage.getItem('hasAccessedPortal');
  const portalType = localStorage.getItem('portalType'); // Retrieve the stored portal type

  useEffect(() => {
    if (hasAccessedPortal && !location.pathname.startsWith('/client-portal') && !location.pathname.startsWith('/employee-portal')) {
      if (portalType === 'employee') {
        navigate('/employee-portal'); // Redirect to Employee Portal
      } else if (portalType === 'client') {
        navigate('/client-portal'); // Redirect to Client Portal
      } else {
        navigate('/'); // Default to home if portalType is not set
      }
    }
  }, [hasAccessedPortal, location, navigate, portalType]);

  const hideNavAndFooter = location.pathname.startsWith('/client-portal') || location.pathname.startsWith('/employee-portal');

  return (
    <>
      {!hideNavAndFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/fundraising" element={<Fundraising />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/client-portal/*" element={<ClientPortal />} />
        <Route path="/employee-portal/*" element={<EmployeePortal />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
      <CopyRight />
    </>
  );
}

export default Main;
