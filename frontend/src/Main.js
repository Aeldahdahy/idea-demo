// Main.js
import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css";

// Common components
import NavBar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import CopyRight from './components/Common/CopyRight';
import Home from './components/Common/Home';
import Contact from './components/Common/Contact';
import AboutUs from './components/Common/AboutUs';
import Blog from './components/Common/Blog';
import Fundraising from './components/Common/Fundraising';
import Invest from './components/Common/Invest';
import PopUpConfirmationOk from './components/Common/PopUpConfirmationOk';
import PopUpConfirmationYesNo from './components/Common/PopUpConfirmationYesNo';

// Employee Portal components
import EmployeePortal from './components/EmployeeComponents/EmployeePortal';
import EmployeeSignForm from './components/EmployeeComponents/EmployeeSignForm';

// Client Portal components
import ClientPortal from './components/ClientComponents/ClientPortal';
import ClientSignForm from './components/ClientComponents/ClientSignForm';

function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, role } = useSelector((state) => state.auth); // Redux state
  const clientRole = useSelector((state) => state.clientAuth.clientData?.clientRole); // Investor or Entrepreneur

  useEffect(() => {
    // Redirect users based on their role after login
    if (isAuthenticated && !location.pathname.startsWith('/client-portal') && !location.pathname.startsWith('/employee-portal')) {
      if (role === 'employee') {
        navigate('/employee-portal');
      } else if (role === 'client') {
        navigate('/client-portal');
      }
    }
  }, [isAuthenticated, role, location, navigate]);

  // Hide NavBar and Footer for /client-portal/clientSignForm and /employee-portal/*
  const hideNavAndFooter =
    location.pathname === '/client-portal/clientSignForm' ||
    location.pathname === '/client-portal/investor/investorPreferences' ||
    location.pathname === '/client-portal/entrepreneur/entreProjectData' ||
    location.pathname.startsWith('/employee-portal');

  return (
    <>
      {!hideNavAndFooter && <NavBar isAuthenticated={isAuthenticated} role={role} clientRole={clientRole} />}
      <Routes>
        {/* Public Routes (Accessible by Anyone) */}
        <Route path="/" element={<Home />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/fundraising" element={<Fundraising />} />
        <Route path="/stories" element={<Blog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        {/* Client Portal Routes */}
        {/* <Route path="/client-portal/clientSignForm" element={<ClientSignForm />} /> */}
        <Route
          path="/client-portal/*"
          element={
            isAuthenticated && role === 'client' ? <ClientPortal /> : <ClientSignForm />
          }
        />

        {/* Employee Portal Routes */}
        {isAuthenticated && role === 'employee' ? (
          <Route path="/employee-portal/*" element={<EmployeePortal />} />
        ) : (
          <Route path="/employee-portal/*" element={<EmployeeSignForm />} />
        )}
      </Routes>
      {!hideNavAndFooter && <Footer />}
      <CopyRight />

      <PopUpConfirmationOk />
      <PopUpConfirmationYesNo />
      <ToastContainer />
    </>
  );
}

export default Main;