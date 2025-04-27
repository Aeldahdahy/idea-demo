import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// public components
import Blog from '../Common/Blog';
import AboutUs from '../Common/AboutUs';
import Contact from '../Common/Contact';

// Entrepreneur components
import ClientEntreHome from './Entrepreneur/ClientEntreHome';
import ClientEntreMyProjects from './Entrepreneur/ClientEntreMyProjects';
import ClientEntreProjectData from './Entrepreneur/ClientEntreProjectData';


// Investor components
import ClientInvestorHome from './Investor/ClientInvestorHome';
import ClientInvestorMyInvestment from './Investor/ClientInvestorMyInvestment';
import ClientInvestorViewProject from './Investor/ClientInvestorViewProject';
import ClientInvestorMessages from './Investor/ClientInvestorMessages';
import ClientInvestorPreferences from './Investor/ClientInvestorPreferences';

const ProtectedRoute = ({ children, allowedRoles, requireFirstLogin = false }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const clientData = useSelector((state) => state.clientAuth.clientData);
  const clientRole = clientData?.clientRole;
  const firstLogin = clientData?.firstLogin;

  // Check if user is authenticated
  if (!isAuthenticated) {
    console.log('Redirecting to /client-portal/clientSignForm due to unauthenticated');
    return <Navigate to="/client-portal/clientSignForm" replace />;
  }

  // Check if clientData and clientRole are defined
  if (!clientData || !clientRole) {
    console.log('Redirecting to /client-portal/clientSignForm due to missing clientData or clientRole');
    return <Navigate to="/client-portal/clientSignForm" replace />;
  }

  // Check if user has the required role
  if (!allowedRoles.includes(clientRole)) {
    console.log(`Redirecting to / due to invalid role. Expected: ${allowedRoles}, Got: ${clientRole}`);
    return <Navigate to="/" replace />;
  }

  // For routes requiring firstLogin: true, check the firstLogin status
  if (requireFirstLogin && firstLogin !== true) {
    console.log('Redirecting to /client-portal/investor due to firstLogin !== true');
    return <Navigate to="/client-portal/investor" replace />;
  }

  return children;
};

function DefaultRedirect({ isAuthenticated, clientRole }) {
  if (!isAuthenticated) {
    return <Navigate to="/client-portal/clientSignForm" replace />;
  } else if (clientRole === 'Investor') {
    return <Navigate to="/client-portal/investor" replace />;
  } else if (clientRole === 'Entrepreneur') {
    return <Navigate to="/client-portal/entrepreneur" replace />;
  } else {
    return <Navigate to="/client-portal/clientSignForm" replace />;
  }
}

function ClientPortal() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const clientRole = useSelector((state) => state.clientAuth.clientData?.clientRole);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <DefaultRedirect isAuthenticated={isAuthenticated} clientRole={clientRole} />
        }
      />

      {/* Investor Routes */}
      <Route
        path="investor"
        element={
          <ProtectedRoute allowedRoles={['Investor']}>
            <ClientInvestorHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="investor/myInvestments"
        element={
          <ProtectedRoute allowedRoles={['Investor']}>
            <ClientInvestorMyInvestment />
          </ProtectedRoute>
        }
      />
      <Route
        path="investor/viewProject/:projectId"
        element={
          <ProtectedRoute allowedRoles={['Investor']}>
            <ClientInvestorViewProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="investor/messages"
        element={
          <ProtectedRoute allowedRoles={['Investor']}>
            <ClientInvestorMessages />
          </ProtectedRoute>
        }
      />
      <Route
        path="investor/stories"
        element={
          <ProtectedRoute allowedRoles={['Investor']}>
            <Blog />
          </ProtectedRoute>
        }
      />
      <Route
        path="investor/about"
        element={
          <ProtectedRoute allowedRoles={['Investor']}>
            <AboutUs />
          </ProtectedRoute>
        }
      />
      <Route
        path="investor/investorPreferences"
        element={
          <ProtectedRoute allowedRoles={['Investor']} requireFirstLogin={true}>
            <ClientInvestorPreferences />
          </ProtectedRoute>
        }
      />
      <Route
        path="investor/editPreferences"
        element={
          <ProtectedRoute allowedRoles={['Investor']}>
            <ClientInvestorPreferences />
          </ProtectedRoute>
        }
      />
      <Route
        path="investor/contact"
        element={
          <ProtectedRoute allowedRoles={['Investor']}>
            <Contact />
          </ProtectedRoute>
        }
      />

      {/* Entrepreneur Routes */}
      <Route
        path="entrepreneur"
        element={
          <ProtectedRoute allowedRoles={['Entrepreneur']}>
            <ClientEntreHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="entrepreneur/myProjects"
        element={
          <ProtectedRoute allowedRoles={['Entrepreneur']}>
            <ClientEntreMyProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="entrepreneur/stories"
        element={
          <ProtectedRoute allowedRoles={['Entrepreneur']}>
            <Blog />
          </ProtectedRoute>
        }
      />
      <Route
        path="entrepreneur/about"
        element={
          <ProtectedRoute allowedRoles={['Entrepreneur']}>
            <AboutUs />
          </ProtectedRoute>
        }
      />
      <Route
        path="entrepreneur/contact"
        element={
          <ProtectedRoute allowedRoles={['Entrepreneur']}>
            <Contact />
          </ProtectedRoute>
        }
      />
      <Route
        path="entrepreneur/entreProjectData"
        element={
          <ProtectedRoute allowedRoles={['Entrepreneur']}>
            <ClientEntreProjectData />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/client-portal/" replace />} />
    </Routes>
  );
}

export default ClientPortal;