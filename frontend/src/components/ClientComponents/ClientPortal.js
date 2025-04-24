// ClientPortal.js
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ClientInvestorHome from './Investor/ClientInvestorHome';
import ClientEntreHome from './Entrepreneur/ClientEntreHome';
// import InvestorOpportunities from './Investor/InvestorOpportunities';
// import InvestorPortfolio from './Investor/InvestorPortfolio';
// import EntrepreneurMyProjects from './Entrepreneur/EntrepreneurMyProjects'; // New component
// import EntrepreneurMessages from './Entrepreneur/EntrepreneurMessages'; // New component
import Blog from '../Common/Blog'; // Reused from public routes
import AboutUs from '../Common/AboutUs'; // Reused from public routes
import Contact from '../Common/Contact'; // Reused from public routes

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const clientRole = useSelector((state) => state.clientAuth.clientData?.clientRole);

  if (!isAuthenticated) {
    return <Navigate to="/client-portal/clientSignForm" replace />;
  }

  if (!clientRole || !allowedRoles.includes(clientRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function ClientPortal() {
  const clientRole = useSelector((state) => state.clientAuth.clientData?.clientRole);

  return (
    <Routes>
      {/* Default route: Redirect based on clientRole */}
      <Route
        path="/"
        element={
          clientRole === 'Investor' ? (
            <Navigate to="investor" replace />
          ) : clientRole === 'Entrepreneur' ? (
            <Navigate to="entrepreneur" replace />
          ) : (
            <Navigate to="/client-portal/clientSignForm" replace />
          )
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
      {/* <Route
        path="investor/opportunities"
        element={
          <ProtectedRoute allowedRoles={['Investor']}>
            <InvestorOpportunities />
          </ProtectedRoute>
        }
      />
      <Route
        path="investor/portfolio"
        element={
          <ProtectedRoute allowedRoles={['Investor']}>
            <InvestorPortfolio />
          </ProtectedRoute>
        }
      /> */}
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
      {/* <Route
        path="entrepreneur/myProjects"
        element={
          <ProtectedRoute allowedRoles={['Entrepreneur']}>
            <EntrepreneurMyProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="entrepreneur/messages"
        element={
          <ProtectedRoute allowedRoles={['Entrepreneur']}>
            <EntrepreneurMessages />
          </ProtectedRoute>
        }
      /> */}
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
      <Route path="*" element={<Navigate to="/client-portal/" replace />} />
    </Routes>
  );
}

export default ClientPortal;